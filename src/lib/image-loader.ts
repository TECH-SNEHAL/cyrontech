// Cloudflare build: there is no image server, so every photo is made in the sizes the page asks for at
// build time (scripts/optimize-images.mjs reads these addresses from the built pages and makes each one).
// /portfolio/x.png at 828 px, quality 75  ->  /_img/828/75/portfolio/x.png.webp
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/") || /\.svg$/i.test(src)) return src; // outside links and drawings stay as they are
  return `/_img/${width}/${quality || 75}${src}.webp`;
}
