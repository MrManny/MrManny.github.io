/**
 * Visual/UX verification for the Magic-card design.
 *
 * Runs against the built site (default http://localhost:3001) in Chromium at
 * several viewports, captures screenshots into artifacts/visual-check/, and
 * reports geometry + readability metrics:
 *   - card keeps the 2.5:3.5 outer aspect ratio in both orientations
 *   - art window keeps its 15:11 ratio
 *   - panels do not overlap and stay inside the card
 *   - text stays readable (>= threshold px)
 *   - type line and description use the same font size as the title
 *   - fluff text scrolls when it overflows (and does not when it fits)
 *   - flip buttons step through cards and wrap around
 *   - background cards sit at the mirrored slant/scale and are clickable
 *   - a touch swipe flips to the next card
 *   - in print, the deck becomes a grid of exact trading-card-sized panels
 *     (63.5mm x 88.9mm) without navigation or backdrops
 *
 * Usage: node scripts/visual-check.mjs   (exit 1 when any check fails)
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3001';
const OUT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'artifacts',
  'visual-check'
);

const VIEWPORTS = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x720', width: 1280, height: 720 },
  { name: 'tablet-820x1180', width: 820, height: 1180 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-landscape-844x390', width: 844, height: 390 },
];

const SEL = {
  stack: '[class$="__stack"]',
  card: '[class$="__card"]',
  catchLeft: '[data-slot="left"] [class$="__catch"]',
  catchRight: '[data-slot="right"] [class$="__catch"]',
  titleBar: '[class$="__titleBar"]',
  title: '[class$="__title"]',
  artWindow: '[class$="__artWindow"]',
  typeBar: '[class$="__typeBar"]',
  typeLine: '[class$="__typeLine"]',
  fluff: '[class$="__fluff"]',
  description: '[class$="__description"]',
  fluffText: '[class$="__fluffText"]',
  layer: '[class$="__layer"]',
  bar: '[class$="__bar"]',
  flipNext: '[class$="__flip"][aria-label="Next card"]',
  flipPrev: '[class$="__flip"][aria-label="Previous card"]',
};

const MIN_FONT = { title: 14, type: 14, description: 14, fluff: 12 };
const CARD_RATIO = 2.5 / 3.5; // width / height
const ART_RATIO = 15 / 11; // width / height

function overlaps(a, b) {
  return (
    a.x < b.x + b.w - 0.5 &&
    b.x < a.x + a.w - 0.5 &&
    a.y < b.y + b.h - 0.5 &&
    b.y < a.y + a.h - 0.5
  );
}

/**
 * Click the visible sliver of a background card's catcher button. Most of
 * the catcher sits behind the active card (only the peeking edge is
 * hittable, for real users too), and the card is rotated, so pick a point
 * well inside the sliver and wait until it hit-tests to the catcher before
 * clicking with real mouse input.
 */
async function clickPeek(page, catcherSel, side) {
  const box = await page.locator(catcherSel).boundingBox();
  const x = box.x + box.width * (side === 'left' ? 0.05 : 0.95);
  const y = box.y + box.height * 0.5;
  await page.waitForFunction(
    ({ x, y }) => {
      const hit = document.elementFromPoint(x, y);
      return !!hit && typeof hit.className === 'string' && hit.className.endsWith('__catch');
    },
    { x, y },
    { timeout: 5000 }
  );
  await page.mouse.click(x, y);
}

async function measure(page) {
  return page.evaluate((sel) => {
    // The deck renders every card; measure only the active one.
    const root = document.querySelector('[data-slot="active"]');
    const el = (s) => root?.querySelector(s) ?? null;
    const box = (s) => {
      const node = el(s);
      if (!node) return null;
      const r = node.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    };
    const font = (s) => {
      const node = el(s);
      return node ? parseFloat(getComputedStyle(node).fontSize) : null;
    };
    const slotInfo = (name) => {
      const node = document.querySelector(`[data-slot="${name}"]`);
      if (!node) return null;
      const m = new DOMMatrixReadOnly(getComputedStyle(node).transform);
      const r = node.getBoundingClientRect();
      return {
        angle: +((Math.atan2(m.b, m.a) * 180) / Math.PI).toFixed(3),
        scale: +Math.hypot(m.a, m.b).toFixed(4),
        cx: +(r.x + r.width / 2).toFixed(1),
      };
    };
    const fluff = el(sel.fluff);
    return {
      card: box(sel.card),
      slots: {
        active: slotInfo('active'),
        left: slotInfo('left'),
        right: slotInfo('right'),
      },
      panels: {
        titleBar: box(sel.titleBar),
        artWindow: box(sel.artWindow),
        typeBar: box(sel.typeBar),
        fluff: box(sel.fluff),
        bar: box(sel.bar),
      },
      fonts: {
        title: font(sel.title),
        type: font(sel.typeLine),
        description: font(sel.description),
        fluff: font(sel.fluffText),
      },
      fluffScroll: fluff
        ? {
            scrollH: fluff.scrollHeight,
            clientH: fluff.clientHeight,
            overflowing: fluff.scrollHeight > fluff.clientHeight + 1,
          }
        : null,
      titleText: el(sel.title)?.textContent ?? null,
    };
  }, SEL);
}

/** All card titles in deck order (the stack renders the deck in card order). */
async function readDeck(page) {
  return page.evaluate((sel) => {
    const titles = [];
    for (const slot of document.querySelectorAll('[data-slot]')) {
      const title = slot.querySelector(sel.title);
      titles.push(title ? title.textContent : null);
    }
    return titles;
  }, SEL);
}

/**
 * Probe the fluff panel's scrolling behavior with synthetic copy: short text
 * must fit without scrolling, long text must overflow and actually scroll.
 * Content-agnostic on purpose, so the check stays valid when the flavor text
 * is rewritten.
 */
async function probeFluff(page) {
  return page.evaluate((sel) => {
    const root = document.querySelector('[data-slot="active"]');
    const fluff = root?.querySelector(sel.fluff);
    const text = fluff?.querySelector(sel.fluffText);
    if (!fluff || !text) return null;
    const original = text.textContent;
    const probe = (content) => {
      text.textContent = content;
      return {
        scrollH: fluff.scrollHeight,
        clientH: fluff.clientHeight,
        overflowing: fluff.scrollHeight > fluff.clientHeight + 1,
      };
    };
    const fits = probe('Short probe text.');
    const long = probe('Long probe text. '.repeat(120));
    fluff.scrollTop = 99999;
    const scrolled = fluff.scrollTop > 0;
    text.textContent = original;
    fluff.scrollTop = 0;
    return { fits, long, scrolled };
  }, SEL);
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const card1 = await measure(page);
    const deck = await readDeck(page);
    const fluffProbe = await probeFluff(page);
    await page.screenshot({ path: path.join(OUT_DIR, `card1-${vp.name}.png`) });

    // Flip through the whole deck: next x3 walks 1 -> 2 -> 0 (wrap), prev
    // steps back. Flip buttons and titles are scoped to the active card.
    const active = page.locator('[data-slot="active"]');
    await active.locator(SEL.flipNext).click();
    await page.waitForTimeout(550);
    const card2 = await measure(page);
    await page.screenshot({ path: path.join(OUT_DIR, `card2-${vp.name}.png`) });

    await active.locator(SEL.flipNext).click();
    await page.waitForTimeout(550);
    const card3Title = await active.locator(SEL.title).textContent();

    await active.locator(SEL.flipNext).click();
    await page.waitForTimeout(550);
    const wrappedTitle = await active.locator(SEL.title).textContent();

    await active.locator(SEL.flipPrev).click();
    await page.waitForTimeout(550);
    const prevTitle = await active.locator(SEL.title).textContent();

    // --- checks ---
    const checks = {};
    const c1 = card1.card;
    const ratio = c1.h / c1.w;
    checks.cardAspect = {
      ok: Math.abs(ratio - 1 / CARD_RATIO) <= 0.03,
      value: +ratio.toFixed(4),
      expected: +(1 / CARD_RATIO).toFixed(4),
    };

    const a = card1.panels.artWindow;
    const artRatio = a.w / a.h;
    checks.artAspect = {
      ok: Math.abs(artRatio - ART_RATIO) <= 0.05,
      value: +artRatio.toFixed(4),
      expected: +ART_RATIO.toFixed(4),
    };

    const fonts = card1.fonts;
    // The type line and the description render at the title's size.
    const sameSize = (a, b) =>
      typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) < 0.05;
    checks.fonts = {
      ok:
        fonts.title >= MIN_FONT.title &&
        fonts.type >= MIN_FONT.type &&
        fonts.description >= MIN_FONT.description &&
        fonts.fluff >= MIN_FONT.fluff &&
        sameSize(fonts.type, fonts.title) &&
        sameSize(fonts.description, fonts.title),
      value: fonts,
      min: MIN_FONT,
    };

    const panels = Object.entries(card1.panels).filter(([, b]) => b);
    const collisions = [];
    for (let i = 0; i < panels.length; i += 1) {
      for (let j = i + 1; j < panels.length; j += 1) {
        if (overlaps(panels[i][1], panels[j][1])) {
          collisions.push(`${panels[i][0]}~${panels[j][0]}`);
        }
      }
    }
    const outside = panels
      .filter(([, b]) => b.x < c1.x - 0.5 || b.y < c1.y - 0.5 || b.x + b.w > c1.x + c1.w + 0.5 || b.y + b.h > c1.y + c1.h + 0.5)
      .map(([name]) => name);
    checks.layout = { ok: collisions.length === 0 && outside.length === 0, collisions, outside };

    // Fluff scrolling is probed with synthetic copy (probeFluff) so the check
    // stays valid when the flavor text is rewritten: short copy must fit
    // without a scrollbar, long copy must overflow and scroll.
    checks.fluffScroll = {
      ok:
        fluffProbe?.fits.overflowing === false &&
        fluffProbe?.long.overflowing === true &&
        fluffProbe?.scrolled === true,
      probe: fluffProbe,
    };

    // Navigation expectations come from the rendered deck order, so card copy
    // may change freely: start at deck[0], next walks 1 -> 2 -> 0 (wrap),
    // prev steps back to the last card.
    checks.flip = {
      ok:
        new Set(deck).size === deck.length &&
        card1.titleText === deck[0] &&
        card2.titleText === deck[1] &&
        card3Title === deck[2] &&
        wrappedTitle === deck[0] &&
        prevTitle === deck[2],
      deck,
      seen: [card1.titleText, card2.titleText, card3Title, wrappedTitle, prevTitle],
    };

    // Background cards: mirrored 1-2deg slant, ~92% scale, symmetric peek.
    const s = card1.slots;
    checks.sideCards = {
      ok:
        !!s.active &&
        !!s.left &&
        !!s.right &&
        s.left.angle >= -2 &&
        s.left.angle <= -1 &&
        s.right.angle >= 1 &&
        s.right.angle <= 2 &&
        Math.abs(s.left.scale - 0.92) <= 0.02 &&
        Math.abs(s.right.scale - 0.92) <= 0.02 &&
        s.left.cx < s.active.cx &&
        s.right.cx > s.active.cx &&
        Math.abs(s.active.cx - s.left.cx - (s.right.cx - s.active.cx)) <= 2,
      slots: s,
    };

    // Wide screens fan the neighbours out further (translateX ±20% instead of
    // ±9%), so the peek offset scales with the card width.
    const spread = s.active && s.left ? (s.active.cx - s.left.cx) / c1.w : null;
    const wideViewport = vp.width >= 900 && vp.width / vp.height >= 7 / 6;
    checks.sideSpread = {
      ok:
        spread !== null &&
        (wideViewport
          ? spread >= 0.18 && spread <= 0.22
          : spread >= 0.07 && spread <= 0.11),
      value: spread,
      expected: wideViewport ? 0.2 : 0.09,
    };

    // Clicking a background card flips to it. The active card is the deck's
    // last one: the left catcher steps back to deck[1], the right catcher
    // (from the new arrangement) wraps to deck[2].
    await clickPeek(page, SEL.catchLeft, 'left');
    await page.waitForTimeout(550);
    const catchLeftTitle = await active.locator(SEL.title).textContent();
    await clickPeek(page, SEL.catchRight, 'right');
    await page.waitForTimeout(550);
    const catchRightTitle = await active.locator(SEL.title).textContent();
    checks.stackNav = {
      ok: catchLeftTitle === deck[1] && catchRightTitle === deck[2],
      seen: [catchLeftTitle, catchRightTitle],
    };

    // Touch swipe left -> next card. The active card is the deck's last one,
    // so the swipe wraps to deck[0].
    await page.evaluate((sel) => {
      const stack = document.querySelector(sel);
      if (!stack) return;
      const r = stack.getBoundingClientRect();
      const y = r.y + r.height / 2;
      const x = r.x + r.width / 2;
      const ev = (type, clientX) =>
        stack.dispatchEvent(
          new PointerEvent(type, {
            bubbles: true,
            cancelable: true,
            pointerType: 'touch',
            pointerId: 1,
            isPrimary: true,
            clientX,
            clientY: y,
          })
        );
      ev('pointerdown', x);
      ev('pointermove', x - 30);
      ev('pointermove', x - 90);
      ev('pointerup', x - 90);
    }, SEL.stack);
    await page.waitForTimeout(200);
    const swipedTitle = await active.locator(SEL.title).textContent();
    checks.swipe = {
      ok: swipedTitle === deck[0],
      seen: swipedTitle,
    };

    results.push({
      viewport: vp.name,
      cardBox: { w: +c1.w.toFixed(1), h: +c1.h.toFixed(1) },
      checks,
      screenshots: [`card1-${vp.name}.png`, `card2-${vp.name}.png`],
    });

    await context.close();
  }

  // --- print pass: the deck prints as real trading cards ---
  // Print layout is sized in mm; A4 portrait minus the 5mm @page margins is
  // 200mm wide, so the auto-fill grid holds three 63.5mm cards per row.
  const MM = 96 / 25.4;
  const printContext = await browser.newContext({
    viewport: { width: Math.round(200 * MM), height: Math.round(287 * MM) },
  });
  const printPage = await printContext.newPage();
  await printPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await printPage.emulateMedia({ media: 'print' });
  await printPage.evaluate(() => document.fonts.ready);
  const printInfo = await printPage.evaluate((sel) => {
    const boxes = [...document.querySelectorAll(sel.card)].map((node) => {
      const r = node.getBoundingClientRect();
      return {
        x: +r.x.toFixed(1),
        y: +r.y.toFixed(1),
        w: +r.width.toFixed(1),
        h: +r.height.toFixed(1),
      };
    });
    const shown = (node) => {
      const s = getComputedStyle(node);
      return s.display !== 'none' && s.visibility !== 'hidden';
    };
    const bar = document.querySelector(sel.bar);
    return {
      boxes,
      barShown: !!bar && shown(bar),
      layersShown: [...document.querySelectorAll(sel.layer)].some(shown),
    };
  }, SEL);
  await printPage.screenshot({
    path: path.join(OUT_DIR, 'print.png'),
    fullPage: true,
  });

  const CARD_W = 63.5 * MM;
  const CARD_H = 88.9 * MM;
  const printRows = new Set(printInfo.boxes.map((b) => Math.round(b.y)));
  const printCols = new Set(printInfo.boxes.map((b) => Math.round(b.x)));
  const printCollisions = [];
  for (let i = 0; i < printInfo.boxes.length; i += 1) {
    for (let j = i + 1; j < printInfo.boxes.length; j += 1) {
      if (overlaps(printInfo.boxes[i], printInfo.boxes[j])) {
        printCollisions.push(`${i}~${j}`);
      }
    }
  }
  results.push({
    viewport: 'print-a4',
    cardBox: {
      w: printInfo.boxes[0]?.w ?? null,
      h: printInfo.boxes[0]?.h ?? null,
    },
    checks: {
      printSize: {
        ok:
          printInfo.boxes.length > 0 &&
          printInfo.boxes.every(
            (b) => Math.abs(b.w - CARD_W) <= 0.5 && Math.abs(b.h - CARD_H) <= 0.5
          ),
        value: printInfo.boxes.map((b) => `${b.w}x${b.h}`),
        expected: `${+CARD_W.toFixed(1)}x${+CARD_H.toFixed(1)}`,
      },
      printGrid: {
        ok:
          printInfo.boxes.length > 0 &&
          printCols.size === 3 &&
          printRows.size === Math.ceil(printInfo.boxes.length / 3) &&
          printCollisions.length === 0,
        rows: printRows.size,
        cols: printCols.size,
        cards: printInfo.boxes.length,
        collisions: printCollisions,
      },
      printChrome: {
        ok: !printInfo.barShown && !printInfo.layersShown,
        barShown: printInfo.barShown,
        layersShown: printInfo.layersShown,
      },
    },
    screenshots: ['print.png'],
  });
  await printContext.close();

  await browser.close();

  let failed = 0;
  for (const r of results) {
    const bad = Object.entries(r.checks)
      .filter(([, v]) => !v.ok)
      .map(([k]) => k);
    if (bad.length) failed += 1;
    console.log(
      `${r.viewport.padEnd(26)} card=${r.cardBox.w}x${r.cardBox.h}  ` +
        `${bad.length ? 'FAIL: ' + bad.join(', ') : 'all checks pass'}`
    );
    for (const [k, v] of Object.entries(r.checks)) {
      console.log(`   ${v.ok ? 'ok  ' : 'FAIL'} ${k}: ${JSON.stringify(v)}`);
    }
  }
  console.log(`\nscreenshots: ${OUT_DIR}`);
  process.exit(failed ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(2);
});
