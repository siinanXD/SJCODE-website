/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` emits plain HTML into ./out,
  // one file per route (leistungen.html, referenz.html, …) so the
  // public URLs stay identical to the previous hand-deployed site.
  output: 'export',
};

export default nextConfig;
