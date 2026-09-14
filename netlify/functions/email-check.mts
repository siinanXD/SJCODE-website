/**
 * Live-Demo „E-Mail-Check“ – Netlify Function (v2 API).
 *
 * Erreichbar unter POST /api/email-check mit JSON { text: string }.
 *
 * Kostenschutz (siehe lib/emailCheck.ts, DEMO_LIMITS):
 *   - pro Besucher (IP) und Tag: 2 Auswertungen
 *   - insgesamt pro Tag: 150 Auswertungen (harter Deckel)
 *   - Eingabe max. 2.500 Zeichen, Antwort max. 450 Tokens, Modell gpt-4o-mini
 * Zähler liegen in Netlify Blobs (Store „email-demo“) und werden mit starker
 * Konsistenz und bedingten Schreibzugriffen (ETag) erhöht – parallele Anfragen
 * können das Limit nicht umgehen. IPs werden nur als gesalzener SHA-256-Hash
 * gespeichert; Einträge älter als gestern werden beim ersten Aufruf eines
 * neuen Tages und zusätzlich täglich per geplanter Function
 * (email-demo-cleanup.mts) gelöscht.
 *
 * Nötige Umgebungsvariablen (Netlify → Site configuration → Environment variables):
 *   OPENAI_API_KEY   – Schlüssel mit eigenem Spending-Limit im OpenAI-Konto!
 *   DEMO_SALT        – zufällige Zeichenkette (Salz für den IP-Hash). Ohne sie
 *                      antwortet die Function mit 503 – ein bekanntes Salz wäre
 *                      ein Datenschutzproblem.
 */

import type { Context, Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import {
  DEMO_LIMITS,
  RESULT_JSON_SCHEMA,
  SYSTEM_PROMPT,
  buildUserMessage,
  parseResult,
  validateInput,
} from '../../lib/emailCheck';

const MODEL = 'gpt-4o-mini';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const ALLOWED_ORIGINS = ['https://sjcode.de', 'https://www.sjcode.de'];
/** Unter Netlifys 10-Sekunden-Limit für synchrone Functions bleiben. */
const OPENAI_TIMEOUT_MS = Number(process.env.DEMO_TIMEOUT_MS) || 8_500;
const RETENTION_MS = 2 * 24 * 60 * 60 * 1000;

type Store = ReturnType<typeof getStore>;
type Counter = { count: number; exp: number };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

/**
 * Zähler atomar erhöhen: Lesen mit ETag, bedingt schreiben, bei Konflikt
 * erneut versuchen. Gibt `ok: false`, wenn das Limit erreicht ist oder nach
 * mehreren Konflikten nicht sicher entschieden werden kann (fail closed).
 */
async function increment(store: Store, key: string, limit: number): Promise<{ ok: boolean; count: number }> {
  const exp = Date.now() + RETENTION_MS;
  for (let attempt = 0; attempt < 4; attempt++) {
    const entry = await store.getWithMetadata(key, { type: 'json' });
    if (!entry) {
      if (limit < 1) return { ok: false, count: 0 };
      const res = await store.setJSON(key, { count: 1, exp } satisfies Counter, { onlyIfNew: true });
      if (res.modified) return { ok: true, count: 1 };
      continue; // jemand war schneller – neu lesen
    }
    const current = entry.data as Counter | null;
    const count = !current || current.exp < Date.now() ? 0 : current.count;
    if (count >= limit) return { ok: false, count };
    const res = await store.setJSON(key, { count: count + 1, exp } satisfies Counter, { onlyIfMatch: entry.etag });
    if (res.modified) return { ok: true, count: count + 1 };
  }
  return { ok: false, count: limit };
}

/** Beim ersten Aufruf eines neuen Tages alle Zähler löschen, die älter als gestern sind. */
async function purgeOld(store: Store, today: string) {
  const yesterday = dayKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const keep = new Set([today, yesterday]);
  try {
    const { blobs } = await store.list();
    const stale = blobs.map((b) => b.key).filter((k) => !keep.has(k.slice(-10)));
    await Promise.all(stale.map((k) => store.delete(k)));
  } catch (err) {
    console.error('Bereinigung fehlgeschlagen', err);
  }
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'Nur POST.' }, 405);

  // Nur von der eigenen Website aufrufbar (verhindert fremde Einbettung/Skripte).
  const origin = req.headers.get('origin') || '';
  const isLocal = origin.startsWith('http://localhost');
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !isLocal && !origin.endsWith('.netlify.app')) {
    return json({ error: 'Nicht erlaubt.' }, 403);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const salt = process.env.DEMO_SALT;
  if (!apiKey || !salt) {
    console.error('Demo nicht konfiguriert:', { OPENAI_API_KEY: !!apiKey, DEMO_SALT: !!salt });
    return json({ error: 'Die Demo ist gerade nicht verfügbar. Die Beispiele funktionieren weiterhin.' }, 503);
  }

  let body: { text?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }
  const input = validateInput(body.text);
  if (!input.ok) return json({ error: input.error }, 400);

  // ---- Ratenlimit (starke Konsistenz, atomare Zähler)
  const store = getStore({ name: 'email-demo', consistency: 'strong' });
  const today = dayKey(new Date());
  const globalKey = `global:${today}`;
  const ipKey = `ip:${await hashIp(context.ip || 'unknown', salt)}:${today}`;

  const ip = await increment(store, ipKey, DEMO_LIMITS.perIpPerDay);
  if (!ip.ok) {
    return json(
      {
        error: `Sie haben die ${DEMO_LIMITS.perIpPerDay} kostenlosen Auswertungen für heute genutzt. Für Ihren echten Posteingang sprechen wir am besten kurz.`,
        remaining: 0,
      },
      429,
    );
  }
  const remaining = DEMO_LIMITS.perIpPerDay - ip.count;

  const global = await increment(store, globalKey, DEMO_LIMITS.globalPerDay);
  if (!global.ok) {
    return json(
      { error: 'Das Tageskontingent der Demo ist erschöpft. Morgen geht es weiter – oder Sie schreiben mir direkt.', remaining },
      429,
    );
  }
  if (global.count === 1) await purgeOld(store, today);

  // ---- Modellaufruf
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);
  try {
    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 450,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserMessage(input.text) },
        ],
        response_format: { type: 'json_schema', json_schema: RESULT_JSON_SCHEMA },
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('OpenAI-Fehler', res.status, detail.slice(0, 300));
      return json({ error: 'Die Auswertung ist fehlgeschlagen. Bitte später erneut versuchen.', remaining }, 502);
    }
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return json({ error: 'Keine Auswertung erhalten.', remaining }, 502);
    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      return json({ error: 'Die Antwort des Modells war nicht lesbar. Bitte erneut versuchen.', remaining }, 502);
    }
    const result = parseResult(parsed);
    if (!result) return json({ error: 'Die Antwort war unbrauchbar.', remaining }, 502);
    return json({ result, remaining });
  } catch (err) {
    const aborted = err instanceof Error && err.name === 'AbortError';
    console.error('Demo-Fehler', err);
    return json(
      {
        error: aborted
          ? 'Die Auswertung hat zu lange gedauert. Bitte erneut versuchen.'
          : 'Netzwerkfehler beim Modellaufruf. Bitte erneut versuchen.',
        remaining,
      },
      504,
    );
  } finally {
    clearTimeout(timer);
  }
};

export const config: Config = {
  path: '/api/email-check',
};
