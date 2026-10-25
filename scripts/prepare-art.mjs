#!/usr/bin/env node
/**
 * Transcodes the master art in `assets/img/` to WebP masters in `public/img/`.
 *
 * The masters (PNG/JPEG) live outside `public/` on purpose: `public/` is copied
 * verbatim into the static export, so keeping the PNGs in `assets/img/` means
 * they are kept for reference but never shipped with the live site.
 *
 * The responsive WebP variants (per-width srcset files) are generated at build
 * time by next-image-export-optimizer from these WebP masters — see
 * next.config.mjs. This script only does the master format conversion.
 *
 * Workflow: drop new art into `assets/img/<name>.png`, then run
 * `npm run dev` or `npm run build`.
 */
import { copyFile, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_DIR = path.join(ROOT, 'assets', 'img');
const OUT_DIR = path.join(ROOT, 'public', 'img');
const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

await mkdir(SRC_DIR, { recursive: true });
await mkdir(OUT_DIR, { recursive: true });

const sources = (await readdir(SRC_DIR, { withFileTypes: true }))
  .filter(
    (entry) =>
      entry.isFile() &&
      SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
  )
  .map((entry) => entry.name)
  .sort();

if (sources.length === 0) {
  console.warn(
    `prepare-art: no images found in ${path.relative(ROOT, SRC_DIR)}/ — nothing to transcode`,
  );
}

const expected = new Set();
for (const file of sources) {
  const { name, ext } = path.parse(file);
  const target = `${name}.webp`;
  expected.add(target.toLowerCase());
  const from = path.join(SRC_DIR, file);
  const to = path.join(OUT_DIR, target);
  if (ext.toLowerCase() === '.webp') {
    await copyFile(from, to);
  } else {
    await sharp(from).webp({ quality: 85 }).toFile(to);
  }
  console.log(`prepare-art: ${file} -> public/img/${target}`);
}

// public/img is derived output: drop masters left over from removed sources so
// stale art cannot leak into the export.
for (const entry of await readdir(OUT_DIR, { withFileTypes: true })) {
  if (
    entry.isFile() &&
    entry.name.toLowerCase().endsWith('.webp') &&
    !expected.has(entry.name.toLowerCase())
  ) {
    await rm(path.join(OUT_DIR, entry.name));
    console.log(`prepare-art: removed stale public/img/${entry.name}`);
  }
}
