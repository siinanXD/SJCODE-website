/**
 * Live-Demo „E-Mail-Check“ – Netlify Function (v2 API).
 *
 * Erreichbar unter POST /api/email-check mit JSON { text: string }.
 *
 * Kostenschutz (siehe lib/emailCheck.ts, DEMO_LIMITS):
 *   - pro Besucher (IP) und Tag: 2 Auswertungen
 *   - insgesamt pro Tag: 150 Auswertungen (harter Deckel)
 *   - Eingabe max. 2.500 Zeichen, Antwort max. 450 Tokens, Modell gpt-4o-mini
 * Zähler liegen in Netlify Blobs (Store „email-demo“), IPs werden nur als
 * gesalzener SHA-256-Hash gespeichert und verfallen nach 2 Tagen.
 *
 * Nötige Umgebungsvariablen (Netlify → Site configuration → Environment variables):
 *   OPENAI_API_KEY   – Schlüssel mit eigenem Spending-Limit im OpenAI-Konto!
 *   DEMO_SALT        – beliebige zufällige Zeichenkette (Salz für den IP-Hash)
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

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  });

const today = () => new Date().toISOString().slice(0, 10);

async function hashIp(ip: string): Promise<string> {
  const salt = process.env.DEMO_SALT || 'sjcode-demo';
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

type Counter = { count: number; exp: number };

async function readCount(store: ReturnType<typeof getStore>, key: string): Promise<number> {
  const raw = (await store.get(key, { type: 'json' })) as Counter | null;
  if (!raw || raw.exp < Date.now()) return 0;
  return raw.count;
}

async function writeCount(store: ReturnType<typeof getStore>, key: string, count: number) {
  // Verfällt nach 2 Tagen – Blobs haben keine TTL, deshalb Ablauf im Wert.
  const exp = Date.now() + 2 * 24 * 60 * 60 * 1000;
  await store.setJSON(key, { count, exp } satisfies Counter);
}

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'Nur POST.' }, 405);

  // Nur von der eigenen Website aufrufbar (verhindert fremde Einbettung/Skripte).
  const origin = req.headers.get('origin') || '';
  const isLocal = origin.startsWith('http://localhost');
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !isLocal && !origin.endsWith('.netlify.app')) {
    return json({ error: 'Nicht erlaubt.' }, 403);
  }

  if (!process.env.OPENAI_API_KEY) {
    return json({ error: 'Die Demo ist gerade nicht verfügbar (kein API-Schlüssel hinterlegt).' }, 503);
  }

  let body: { text?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }
  const input = validateInput(body.text);
  if (!input.ok) return json({ error: input.error }, 400);

  // ---- Ratenlimit
  const store = getStore('email-demo');
  const day = today();
  const ipKey = `ip:${await hashIp(context.ip || 'unknown')}:${day}`;
  const globalKey = `global:${day}`;
  const [ipCount, globalCount] = await Promise.all([readCount(store, ipKey), readCount(store, globalKey)]);

  if (globalCount >= DEMO_LIMITS.globalPerDay) {
    return json(
      { error: 'Das Tageskontingent der Demo ist erschöpft. Morgen geht es weiter – oder Sie schreiben mir direkt.', remaining: 0 },
      429,
    );
  }
  if (ipCount >= DEMO_LIMITS.perIpPerDay) {
    return json(
      {
        error: `Sie haben die ${DEMO_LIMITS.perIpPerDay} kostenlosen Auswertungen für heute genutzt. Für Ihren echten Posteingang sprechen wir am besten kurz.`,
        remaining: 0,
      },
      429,
    );
  }
  // Zähler VOR dem Modellaufruf erhöhen – ein Fehler beim Aufruf darf das Limit nicht umgehen.
  await Promise.all([writeCount(store, ipKey, ipCount + 1), writeCount(store, globalKey, globalCount + 1)]);
  const remaining = DEMO_LIMITS.perIpPerDay - ipCount - 1;

  // ---- Modellaufruf
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
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
    const data = (await res.json()) as { choices?: { message?: { content?: string; refusal?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return json({ error: 'Keine Auswertung erhalten.', remaining }, 502);
    const result = parseResult(JSON.parse(content));
    if (!result) return json({ error: 'Die Antwort war unbrauchbar.', remaining }, 502);
    return json({ result, remaining });
  } catch (err) {
    console.error('Demo-Fehler', err);
    return json({ error: 'Zeitüberschreitung oder Netzwerkfehler. Bitte erneut versuchen.', remaining }, 504);
  } finally {
    clearTimeout(timer);
  }
};

export const config: Config = {
  path: '/api/email-check',
};
