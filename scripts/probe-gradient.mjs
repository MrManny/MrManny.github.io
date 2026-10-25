/** One-off Playwright probe: what background does the browser actually
 *  compute for the card frame, and does it support color-mix()?
 *  Usage: node scripts/probe-gradient.mjs
 */
import { chromium } from 'playwright';

const url = process.env.BASE_URL ?? 'http://localhost:3001';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const info = await page.evaluate(() => {
  const frame = document.querySelector('[class$="__frame"]');
  const cs = getComputedStyle(frame);
  return {
    supportsColorMix: CSS.supports('background', 'color-mix(in srgb, red 87%, black)'),
    backgroundImage: cs.backgroundImage,
    backgroundColor: cs.backgroundColor,
    inlineAccent: document.querySelector('[class$="__card"]')?.style.getPropertyValue('--card-accent'),
  };
});
console.log(JSON.stringify(info, null, 2));

const card = await page.locator('[class$="__card"]').boundingBox();
await page.screenshot({
  path: 'artifacts/visual-check/gradient-frame.png',
  clip: { x: card.x, y: card.y, width: card.width, height: card.height },
});
console.log(`card ${card.width}x${card.height} -> artifacts/visual-check/gradient-frame.png`);
await browser.close();
