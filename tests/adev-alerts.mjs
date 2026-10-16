// Browser test of the alerts, pills, API labels, kbd keys and decorative header of the adev theme (examples/adev.md).
// Builds the deck, opens each slide, checks the elements, then repeats the colour checks in both schemes
// (data-adev-scheme on html) with the WCAG contrast of every new surface. `SLIDE_NG_DIR` points at a slide.ng checkout.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const core = resolve(process.env.SLIDE_NG_DIR ?? join(root, '../slide.ng'));
const bin = join(core, 'bin/slide-ng.mjs');
if (!existsSync(bin)) throw new Error(`slide.ng was not found at ${core}. Set SLIDE_NG_DIR.`);
const { launch, reporter, serve } = await import(
  pathToFileURL(join(core, 'tests/e2e/browser.mjs')).href
);
const { makeContext } = await import(pathToFileURL(join(core, 'tests/e2e/helpers.mjs')).href);

const KINDS = ['note', 'tip', 'todo', 'question', 'summary', 'tldr', 'critical', 'important'];
const API = [
  'class',
  'const',
  'decorator',
  'directive',
  'element',
  'enum',
  'function',
  'interface',
  'pipe',
  'ng-module',
  'type-alias',
  'block',
];

// Text pairs: [name, slide, element selector, selector of the text colour inside (or the element itself), minimum ratio].
// The surface is the element's own computed background (all new surfaces are opaque), the page behind it otherwise.
const PAIRS = [
  ...KINDS.map((k) => [`alert ${k} label`, 1, `.adev-alert-${k} .adev-alert-label`, 4.5]),
  ...KINDS.map((k) => [`alert ${k} text`, 1, `.adev-alert-${k} .adev-alert-body`, 4.5]),
  ['alert helpful label', 1, '.adev-alert-helpful .adev-alert-label', 4.5],
  ['alert helpful text', 1, '.adev-alert-helpful .adev-alert-body', 4.5],
  ...[...KINDS, 'helpful'].map((k) => [`alert ${k} icon`, 1, `.adev-alert-${k} svg`, 3, 'fill']),
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => [`pill ${n}`, 3, `.adev-pill:nth-child(${n})`, 4.5]),
  ['pill link', 3, '.adev-pill-link', 4.5],
  ...API.map((k) => [`api label ${k}`, 4, `.adev-api-label-${k}`, 4.5]),
  ...['class', 'deprecated', 'developer-preview', 'experimental', 'stable'].map((k) => [
    `api label full ${k}`,
    4,
    `.adev-api-label-full.adev-api-label-${k}`,
    4.5,
  ]),
  ['api label version', 4, '.adev-api-label-version', 4.5],
  ['kbd', 5, 'kbd', 4.5],
  ['adev-kbd', 5, 'adev-kbd', 4.5],
  ['table text', 6, 'td', 4.5],
  ['table header', 6, 'th', 4.5],
  ['decorative header', 8, 'adev-decorative-header:not(.adev-decorative-header-gradient)', 4.5],
  ['decorative header gradient', 8, '.adev-decorative-header-gradient', 4.5],
];

async function measure(page, selector, prop) {
  return page
    .locator(selector)
    .first()
    .evaluate((el, p) => {
      const ctx = Object.assign(document.createElement('canvas'), {
        width: 1,
        height: 1,
      }).getContext('2d', { willReadFrequently: true });
      const rgb = (css) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = '#000';
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        return [...ctx.getImageData(0, 0, 1, 1).data];
      };
      const lum = (c) =>
        c
          .slice(0, 3)
          .map((v) => v / 255)
          .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
          .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
      let node = el;
      let bg = [0, 0, 0, 0];
      while (node && bg[3] === 0) {
        bg = rgb(getComputedStyle(node).backgroundColor);
        node = node.parentElement;
      }
      const fg = rgb(getComputedStyle(el)[p]);
      const a = lum(fg);
      const b = lum(bg);
      return { ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), bg: bg.join() };
    }, prop);
}

const t = reporter();
const scratch = mkdtempSync(join(tmpdir(), 'adev-alerts-'));
const dist = join(scratch, 'site');
const env = {
  ...process.env,
  CHROME_PATH: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
};
execFileSync(process.execPath, [bin, 'build', join(root, 'examples/adev.md'), '--out', dist], {
  stdio: 'inherit',
  env,
});

const browser = await launch();
try {
  const { server, port } = await serve(dist);
  const ctx = makeContext(`http://localhost:${port}`, browser, t);
  const routeFonts = (page) =>
    page.route('**/fonts.googleapis.com/**', (route) =>
      route.fulfill({ status: 200, contentType: 'text/css', body: '' }),
    );
  const count = (page, selector) => page.locator(selector).count();
  const style = (page, selector, prop) => ctx.style(page, selector, prop);
  const setScheme = async (page, scheme) => {
    await page.evaluate((s) => (document.documentElement.dataset.adevScheme = s), scheme);
    await page.waitForTimeout(500);
  };

  const pages = {};
  // Slides 1 to 8 of this test are these slides of examples/adev.md.
  const SLIDES = [12, 13, 14, 15, 16, 20, 21, 22];
  for (const [i, n] of SLIDES.entries())
    pages[i + 1] = await ctx.open(`/${n}`, undefined, routeFonts);

  t.ok('slide 1: nine alerts', (await count(pages[1], 'adev-alert')) === 9);
  t.ok(
    'slide 1: the label is the kind name',
    (await pages[1].locator('.adev-alert-tldr .adev-alert-label').textContent()) === 'TL;DR',
  );
  t.ok(
    'slide 1: a title replaces the label',
    (await pages[1].locator('.adev-alert-helpful .adev-alert-label').textContent()) === 'Handy',
  );
  t.ok(
    'slide 2: bare hides the label',
    (await count(pages[2], '.adev-alert-todo')) === 1 &&
      (await count(pages[2], '.adev-alert-todo .adev-alert-label')) === 0,
  );
  t.ok(
    'slide 1: rail is 3px',
    (await style(pages[1], '.adev-alert-note', 'borderLeftWidth')) === '3px',
  );

  const para = await pages[2]
    .locator('adev-alert')
    .evaluateAll((els) => els.map((e) => [e.className, e.textContent]));
  t.ok('slide 2: three paragraph alerts and a tag', para.length === 4, JSON.stringify(para));
  t.ok(
    'slide 2: kinds note, tip, critical',
    para.map((p) => /adev-alert-(\w+)/.exec(p[0])?.[1]).join() === 'note,tip,critical,todo',
  );
  t.ok(
    'slide 2: markdown inside the alert',
    (await count(pages[2], 'adev-alert strong')) === 1 &&
      (await count(pages[2], 'adev-alert code')) >= 1,
  );
  t.ok(
    'slide 2: braces stay as text',
    para[2][1].includes('{{ value() }}') && para[2][1].includes('{brace}'),
  );

  t.ok(
    'slide 3: ten pills in two rows',
    (await count(pages[3], 'adev-pill-row')) === 2 && (await count(pages[3], 'adev-pill')) === 10,
  );
  t.ok('slide 3: three link pills', (await count(pages[3], 'adev-pill a[href]')) === 3);
  t.ok(
    'slide 3: pill is round',
    parseFloat(await style(pages[3], 'adev-pill', 'borderTopLeftRadius')) > 20,
  );
  t.ok(
    'slide 3: external icon',
    (await pages[3]
      .locator('a[href^="https:"]')
      .first()
      .evaluate((e) => getComputedStyle(e, '::after').content)) === '""',
  );
  const accents = await pages[3]
    .locator('adev-pill-row')
    .first()
    .locator('adev-pill')
    .evaluateAll((els) => els.slice(0, 3).map((e) => getComputedStyle(e).color));
  t.ok(
    'slide 3: row pills have different accents',
    new Set(accents).size === 3,
    accents.join(' | '),
  );

  t.ok(
    'slide 4: twelve short labels',
    (await count(pages[4], '.adev-api-label:not(.adev-api-label-full)')) === 12,
  );
  t.ok(
    'slide 4: short label is 22px',
    (await style(pages[4], '.adev-api-label', 'width')) === '22px',
  );
  t.ok(
    'slide 4: full labels show the name and version',
    (await pages[4].locator('.adev-api-label-deprecated').innerText())
      .replace(/\s+/g, ' ')
      .trim() === 'Deprecated v20',
  );

  t.ok(
    'slide 5: kbd has a border and radius',
    (await style(pages[5], 'kbd', 'borderTopWidth')) === '1px' &&
      (await style(pages[5], 'kbd', 'borderTopLeftRadius')) === '3px',
  );
  t.ok(
    'slide 5: adev-kbd looks the same',
    (await style(pages[5], 'adev-kbd', 'borderTopWidth')) === '1px',
  );

  const widths = await pages[6]
    .locator('table')
    .evaluate((e) => [
      e.offsetWidth,
      e.parentElement.clientWidth -
        parseFloat(getComputedStyle(e.parentElement).paddingLeft) -
        parseFloat(getComputedStyle(e.parentElement).paddingRight),
    ]);
  t.ok('slide 6: table is full width', widths[0] >= widths[1] - 2, widths.join());
  t.ok(
    'slide 6: header row has borders',
    (await style(pages[6], 'th', 'borderTopWidth')) === '1px',
  );
  t.ok(
    'slide 6: external link has an icon',
    (await pages[6]
      .locator('p a[href^="https:"]')
      .first()
      .evaluate((e) => getComputedStyle(e, '::after').content)) === '""',
  );
  t.ok(
    'slide 6: internal link has none',
    (await pages[6]
      .locator('p a[href="/overview"]')
      .first()
      .evaluate((e) => getComputedStyle(e, '::after').content)) === 'none',
  );

  const sizes = await Promise.all(
    ['h2', 'h3', 'h4', 'h5', 'h6'].map(async (h) =>
      parseFloat(await style(pages[7], h, 'fontSize')),
    ),
  );
  t.ok(
    'slide 7: h2 to h5 get smaller',
    sizes[0] > sizes[1] && sizes[1] > sizes[2] && sizes[2] > sizes[3],
    sizes.join(),
  );
  t.ok('slide 7: hr is a hairline', (await style(pages[7], 'hr', 'borderTopWidth')) === '1px');

  t.ok(
    'slide 8: header title and image',
    (await count(pages[8], '.adev-decorative-header-title')) === 2 &&
      (await count(pages[8], 'adev-decorative-header img')) === 1,
  );
  t.ok(
    'slide 8: radius 10px',
    (await style(pages[8], 'adev-decorative-header', 'borderTopLeftRadius')) === '10px',
  );
  t.ok(
    'slide 8: gradient variant',
    /gradient/.test(await style(pages[8], '.adev-decorative-header-gradient', 'backgroundImage')),
  );

  const tints = {};
  for (const scheme of ['light', 'dark']) {
    for (const n of Object.keys(pages)) await setScheme(pages[n], scheme);
    for (const [name, n, selector, min, prop = 'color'] of PAIRS) {
      if (name.includes('gradient')) continue;
      const { ratio, bg } = await measure(pages[n], selector, prop);
      t.ok(`${scheme}: contrast ${name}`, ratio >= min, `${ratio.toFixed(2)} (>= ${min})`);
      tints[`${scheme}${name}`] = bg;
    }
    const gradientText = await style(pages[8], '.adev-decorative-header-gradient', 'color');
    t.ok(
      `${scheme}: gradient header text is white`,
      gradientText === 'rgb(255, 255, 255)',
      gradientText,
    );
  }
  for (const name of ['alert note text', 'pill 1', 'api label class', 'decorative header'])
    t.ok(
      `the ${name} surface changes with the scheme`,
      tints[`light${name}`] !== tints[`dark${name}`],
      `${tints[`light${name}`]} -> ${tints[`dark${name}`]}`,
    );

  t.ok('no console errors or warnings', ctx.problems.length === 0, JSON.stringify(ctx.problems));
  server.close();
} finally {
  await browser.close();
}
process.exit(t.done());
