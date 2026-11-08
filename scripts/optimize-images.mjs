// After `next build`: finds every /_img/<width>/<quality>/<file>.webp address in the built site and makes
// that small WebP from the original photo (never bigger than the original). Run by `npm run build:cf`.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const out = path.resolve("out");
const wanted = new Set();
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "_img") walk(p); continue; }
    if (!/\.(html|txt|js|json|css)$/.test(e.name)) continue;
    const text = fs.readFileSync(p, "utf8");
    for (const m of text.matchAll(/\/_img\/(\d+)\/(\d+)(\/[^"'\s,)]+?\.(?:png|jpe?g|webp|avif))\.webp/gi)) {
      if (!m[0].includes("\\")) wanted.add(m[0]); // skip copies with escaped characters inside the JS
    }
  }
})(out);

let made = 0, before = 0, after = 0;
for (const url of wanted) {
  const [, w, q, src] = url.match(/^\/_img\/(\d+)\/(\d+)(\/.+)\.webp$/);
  const from = path.join(out, decodeURIComponent(src));
  if (!fs.existsSync(from)) { console.warn("missing photo:", src); continue; }
  const to = path.join(out, decodeURIComponent(url));
  fs.mkdirSync(path.dirname(to), { recursive: true });
  await sharp(from).resize({ width: Number(w), withoutEnlargement: true }).webp({ quality: Number(q) }).toFile(to);
  before += fs.statSync(from).size; after += fs.statSync(to).size; made++;
}
console.log(`photos: ${made} sizes made (${wanted.size} asked for)`);
