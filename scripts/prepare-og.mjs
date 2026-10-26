#!/usr/bin/env node
/**
 * Composites the social-preview image `public/og-image.png` (1200x630).
 *
 * Masters (committed, never shipped):
 * - `assets/img/aidlc.png` — the card art, cover-cropped to the OG aspect
 * - `assets/og/og-text.png` — scrim + title plate, rendered with the site's
 *   serif type by `scripts/og-text-plate.py` (rerun that only when the OG
 *   title text changes)
 *
 * The output is derived state, generated on every `npm run dev` / `npm run
 * build` (CI included) and never committed — see .gitignore. This script only
 * does pure pixel compositing, so the result is identical on every platform.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const ART = path.join(ROOT, 'assets', 'img', 'aidlc.png');
const PLATE = path.join(ROOT, 'assets', 'og', 'og-text.png');
const OUT = path.join(ROOT, 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

await mkdir(path.dirname(OUT), { recursive: true });

const meta = await sharp(ART).metadata();
// Cover-crop to the OG aspect with a slight top bias so the face and the
// robot stay in frame (same framing as the original approved composite).
const cropHeight = Math.round(meta.width / (WIDTH / HEIGHT));
const cropTop = Math.round((meta.height - cropHeight) * 0.2);

await sharp(ART)
  .extract({
    left: 0,
    top: cropTop,
    width: meta.width,
    height: cropHeight,
  })
  .resize(WIDTH, HEIGHT)
  .composite([{ input: PLATE }])
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(
  `prepare-og: ${path.relative(ROOT, ART)} + ${path.relative(ROOT, PLATE)} -> public/og-image.png`,
);
