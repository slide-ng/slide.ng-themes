// Browser test of the code family of the adev theme: prefer and avoid, line numbers, highlights, diff lines, file tabs,
// code from a file and the copy button, in the light and the dark scheme (see README: SLIDE_NG_DIR, default ../slide.ng).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const core = resolve(process.env.SLIDE_NG_DIR ?? join(root, '../slide.ng'));
const bin = join(core, 'bin/slide-ng.mjs');
if (!existsSync(bin))
  throw new Error(`slide.ng was not found at ${core}. Set SLIDE_NG_DIR to a checkout of slide.ng.`);
const { launch, reporter, serve } = await import(
  pathToFileURL(join(core, 'tests/e2e/browser.mjs')).href
);
const { makeContext } = await import(pathToFileURL(join(core, 'tests/e2e/helpers.mjs')).href);

// Slides of examples/adev.md, in the order: fences, components, lines, diff, tabs, snippet, code card.
const SLIDES = [25, 26, 27, 28, 29, 30, 19];
const GREEN = 'var(--adev-super-green)';
const RED = 'var(--adev-hot-red)';
const header = (c) => `color-mix(in srgb, ${c} 10%, var(--adev-page))`;
const chip = (c) => `color-mix(in srgb, ${c} 20%, ${header(c)})`;
const highlight = 'color-mix(in srgb, var(--adev-bright-blue) 9%, var(--adev-code-bg))';
const added = 'color-mix(in srgb, var(--adev-super-green) 12%, var(--adev-code-bg))';
const removed = (scheme) =>
  `color-mix(in srgb, var(--adev-hot-red) ${scheme === 'dark' ? 16 : 8}%, var(--adev-code-bg))`;

// [name, slide, fg, surface, smallest ratio]. A fg is a CSS colour or { tokens: selector } (every colour of the code spans in it).
const contrastChecks = (scheme) => [
  [
    'prefer chip text',
    1,
    'color-mix(in srgb, ' + GREEN + ' 35%, var(--adev-primary))',
    chip(GREEN),
    4.5,
  ],
  [
    'prefer title',
    1,
    'color-mix(in srgb, ' + GREEN + ' 35%, var(--adev-primary))',
    header(GREEN),
    4.5,
  ],
  [
    'avoid chip text',
    1,
    'color-mix(in srgb, ' + RED + ' 35%, var(--adev-primary))',
    chip(RED),
    4.5,
  ],
  ['avoid title', 1, 'color-mix(in srgb, ' + RED + ' 35%, var(--adev-primary))', header(RED), 4.5],
  ['prefer code', 1, { tokens: '.adev-prefer .slidev-code' }, 'var(--adev-code-bg)', 3],
  ['avoid code', 1, { tokens: '.adev-avoid .slidev-code' }, 'var(--adev-code-bg)', 3],
  ['text in a prefer card', 2, 'var(--adev-primary)', 'var(--adev-code-bg)', 4.5],
  ['line numbers', 3, 'var(--adev-quaternary)', 'var(--adev-code-bg)', 4.5],
  ['highlighted code', 3, { tokens: '.slidev-code-highlighted' }, highlight, 3],
  ['added code', 4, { tokens: '.line.diff.add' }, added, 3],
  ['removed code', 4, { tokens: '.line.diff.remove' }, removed(scheme), 3],
  ['added sign', 4, 'color-mix(in srgb, ' + GREEN + ' 45%, var(--adev-primary))', added, 3],
  [
    'removed sign',
    4,
    'color-mix(in srgb, ' + RED + ' 70%, var(--adev-primary))',
    removed(scheme),
    3,
  ],
  ['active tab', 5, 'var(--adev-primary)', 'var(--adev-subtle-purple)', 4.5],
  ['other tab', 5, 'var(--adev-tertiary)', 'var(--adev-subtle-purple)', 4.5],
  ['file name', 6, 'var(--adev-electric-violet)', 'var(--adev-subtle-purple)', 4.5],
  ['language label', 6, 'var(--adev-tertiary)', 'var(--adev-subtle-purple)', 4.5],
  ['copy icon', 7, 'var(--adev-tertiary)', 'var(--adev-subtle-purple)', 3],
];

// Chromium paints the pair to a canvas, which turns oklch() and color-mix() into plain sRGB.
function measure(page, items) {
  return page.locator('adev-default').evaluate((layout, list) => {
    const ctx = Object.assign(document.createElement('canvas'), { width: 1, height: 1 }).getContext(
      '2d',
      { willReadFrequently: true },
    );
    const probe = document.createElement('div');
    layout.appendChild(probe);
    const rgb = (css, prop) => {
      probe.style.cssText = `${prop}: ${css}`;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = getComputedStyle(probe)[prop];
      ctx.fillRect(0, 0, 1, 1);
      return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
    };
    const lum = (c) =>
      c
        .map((v) => v / 255)
        .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
        .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
    const ratio = (fg, bg) => {
      const [a, b] = [lum(rgb(fg, 'color')), lum(rgb(bg, 'background-color'))];
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    const out = list.map(([name, fg, surface, min]) => {
      if (typeof fg === 'string') return [name, ratio(fg, surface), min];
      const colours = new Set(
        [...layout.querySelectorAll(`${fg.tokens} span`)]
          .filter((s) => !s.children.length && s.textContent.trim())
          .map((s) => getComputedStyle(s).color),
      );
      return [
        name,
        colours.size ? Math.min(...[...colours].map((c) => ratio(c, surface))) : 0,
        min,
      ];
    });
    probe.remove();
    return out;
  }, items);
}

const t = reporter();
const scratch = mkdtempSync(join(tmpdir(), 'slide-ng-adev-code-'));
const env = {
  ...process.env,
  CHROME_PATH: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
};
const deck = join(root, 'examples', 'adev.md');
const dist = join(scratch, 'site');
if (!existsSync(join(root, 'node_modules/@slide-ng/theme-adev')))
  throw new Error('Run npm install first: it links the packages into node_modules/@slide-ng.');
execFileSync(process.execPath, [bin, 'build', deck, '--out', dist], { stdio: 'inherit', env });

const browser = await launch();
try {
  const { server, port } = await serve(dist);
  const ctx = makeContext(`http://localhost:${port}`, browser, t);
  const size = { width: 1280, height: 720 };
  const setup = async (page) => {
    await page.route('**/fonts.googleapis.com/**', (route) =>
      route.fulfill({ status: 200, contentType: 'text/css', body: '' }),
    );
    await page.addInitScript(() => {
      window.copied = [];
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: async (text) => window.copied.push(text) },
      });
    });
  };
  const open = (n) => ctx.open(`/${n}`, size, setup);
  const scheme = async (page, name) => {
    await page.evaluate((s) => (document.documentElement.dataset.adevScheme = s), name);
    await page.waitForTimeout(100);
  };
  const css = (page, selector, prop, pseudo) =>
    page
      .locator(selector)
      .first()
      .evaluate((e, [p, ps]) => getComputedStyle(e, ps)[p], [prop, pseudo ?? null]);
  const text = (page, selector) => page.locator(selector).first().innerText();
  const channels = (colour) => colour.match(/[\d.]+/g).map(Number);

  const pages = [];
  for (const n of SLIDES) pages.push(await open(n));
  const [fences, components, lines, diff, tabs, snippet, card] = pages;

  // 1. prefer and avoid fences
  t.ok(
    'fences: a prefer card and an avoid card',
    (await fences.locator('adev-prefer, adev-avoid').count()) === 2,
  );
  t.ok(
    'fences: the chips say Prefer and Avoid',
    (await text(fences, '.adev-prefer .adev-verdict-chip')).trim().toLowerCase() === 'prefer' &&
      (await text(fences, '.adev-avoid .adev-verdict-chip')).trim().toLowerCase() === 'avoid',
  );
  t.ok(
    'fences: the [title] moves to the header',
    (await text(fences, '.adev-prefer .adev-verdict-title')) === 'counter.ts' &&
      (await fences.locator('.adev-verdict .slidev-code-block-title').count()) === 0,
  );
  t.ok(
    'fences: the code is highlighted inside the card',
    (await fences.locator('.adev-prefer .slidev-code .line').count()) === 2,
  );
  t.ok(
    'fences: the {prefer} mark is not left in the code',
    !(await text(fences, 'adev-default')).includes('{prefer}'),
  );

  // 2. prefer and avoid components
  t.ok(
    'components: text in a prefer card',
    (await text(components, '.adev-prefer .adev-verdict-body')).includes('computed()'),
  );
  t.ok(
    'components: the title attribute and a code block in an avoid card',
    (await text(components, '.adev-avoid .adev-verdict-title')) === 'legacy.ts' &&
      (await components.locator('.adev-avoid .slidev-code').count()) === 1,
  );

  // 3. line numbers and highlights
  t.ok(
    'lines: line numbers are on',
    (await lines.locator('.slidev-code-line-numbers').count()) === 1,
  );
  t.ok(
    'lines: the number is a counter with a hairline',
    (await css(lines, '.slidev-code .line', 'content', '::before')).includes('counter') &&
      (await css(lines, '.slidev-code .line', 'borderRightWidth', '::before')) === '1px',
  );
  t.ok(
    'lines: {2,4-5} highlights three lines and dims five',
    (await lines.locator('.slidev-code-highlighted').count()) === 3 &&
      (await lines.locator('.slidev-code-dishonored').count()) === 5,
  );
  t.ok(
    'lines: a highlighted line has the left rail',
    /rgb.* 2px 0px 0px 0px inset|inset/.test(
      await css(lines, '.slidev-code-highlighted', 'boxShadow'),
    ),
  );
  t.ok(
    'lines: a highlighted line has a tint, a normal one none',
    (await css(lines, '.slidev-code-highlighted', 'backgroundColor')) !==
      (await css(lines, '.slidev-code-dishonored', 'backgroundColor')),
  );

  // 4. diff lines
  t.ok(
    'diff: one added and one removed line',
    (await diff.locator('.line.diff.add').count()) === 1 &&
      (await diff.locator('.line.diff.remove').count()) === 1,
  );
  t.ok(
    'diff: the notation comments are removed from the code',
    !(await text(diff, '.slidev-code')).includes('[!code'),
  );
  t.ok(
    'diff: + and - signs in the gutter',
    (await css(diff, '.line.diff.add', 'content', '::after')) === '"+"' &&
      (await css(diff, '.line.diff.remove', 'content', '::after')) === '"-"',
  );
  t.ok(
    'diff: other lines are untouched',
    (await diff.locator('.slidev-code .line:not(.diff)').count()) === 3,
  );

  // 5. file tabs
  t.ok(
    'tabs: three tabs, the first is active',
    (await tabs.locator('.slidev-code-tab').count()) === 3 &&
      (await tabs.locator('.slidev-code-tab.active').innerText()) === 'app.ts',
  );
  t.ok(
    'tabs: the group is a hairline card',
    (await css(tabs, '.slidev-code-group', 'borderTopWidth')) === '1px',
  );
  await tabs.getByRole('button', { name: 'app.html' }).click();
  await tabs.waitForTimeout(200);
  t.ok(
    'tabs: a click shows the second file',
    (await tabs.locator('.slidev-code-tab.active').innerText()) === 'app.html' &&
      (await tabs.locator('.slidev-code-wrapper.active').innerText()).includes('<h1>'),
  );
  t.ok(
    'tabs: the other files are hidden',
    (await tabs.locator('.slidev-code-wrapper:visible').count()) === 1,
  );

  // 6. code from a file
  t.ok(
    'snippet: the header has the file name and the language',
    (await text(snippet, '.adev-code-card-title')) === 'user.component.ts' &&
      (await text(snippet, '.adev-code-card-label')) === 'TypeScript',
  );
  const imported = await text(snippet, '.adev-code-card .slidev-code');
  t.ok(
    'snippet: only the region is shown, without its markers',
    imported.includes('class User') &&
      !imported.includes('DEFAULT_NAME') &&
      !imported.includes('region'),
  );

  // 7. the copy button
  t.ok(
    'copy: hidden until the card is hovered',
    (await css(card, '.adev-code-card .adev-copy', 'opacity')) === '0',
  );
  await card.locator('.adev-code-card').hover();
  await card.waitForTimeout(250);
  t.ok(
    'copy: visible on hover',
    (await css(card, '.adev-code-card .adev-copy', 'opacity')) === '1',
  );
  await card.locator('.adev-code-card .adev-copy').click();
  await card.waitForTimeout(200);
  t.ok(
    'copy: the click copies the code',
    (await card.evaluate(() => window.copied.at(-1) ?? '')).includes('export class App'),
  );
  t.ok(
    'copy: the button says it copied',
    (await card.locator('.adev-copy').getAttribute('aria-label')) === 'Copied',
  );
  await card.evaluate(() => (window.copied = []));
  await fences.locator('.adev-prefer').hover();
  await fences.locator('.adev-prefer .adev-copy').click();
  t.ok(
    'copy: a prefer card copies its code',
    (await fences.evaluate(() => window.copied.at(-1) ?? '')).includes('signal(0)'),
  );

  // light and dark
  const expected = {
    light: { prefer: (c) => c[1] > c[0] && c[1] > c[2], avoid: (c) => c[0] > c[1] },
    dark: { prefer: (c) => c[1] > c[0] && c[1] > c[2], avoid: (c) => c[0] > c[1] },
  };
  for (const name of ['light', 'dark']) {
    for (const p of pages) await scheme(p, name);
    const l = `${name}:`;
    const border = async (selector) => channels(await css(fences, selector, 'borderTopColor'));
    t.ok(
      `${l} the prefer card is green and the avoid card red`,
      expected[name].prefer(await border('.adev-prefer')) &&
        expected[name].avoid(await border('.adev-avoid')),
    );
    t.ok(
      `${l} the verdict header is tinted, not the page colour`,
      (await css(fences, '.adev-prefer .adev-verdict-header', 'backgroundColor')) !==
        (await css(fences, 'adev-default', 'backgroundColor')),
    );
    const panel = name === 'dark' ? 'rgb(36, 41, 46)' : 'rgb(255, 255, 255)';
    t.ok(
      `${l} the code panel colour follows the scheme`,
      (await css(lines, '.slidev-code', 'backgroundColor')) === panel &&
        (await css(fences, '.adev-prefer', 'backgroundColor')) === panel,
    );
    t.ok(
      `${l} the highlight tint differs from the panel`,
      (await css(lines, '.slidev-code-highlighted', 'backgroundColor')) !== panel,
    );
    t.ok(
      `${l} the add and remove tints differ from each other and the panel`,
      new Set([
        await css(diff, '.line.diff.add', 'backgroundColor'),
        await css(diff, '.line.diff.remove', 'backgroundColor'),
        panel,
      ]).size === 3,
    );
    t.ok(
      `${l} the active tab has the pink underline`,
      channels(await css(tabs, '.slidev-code-tab.active', 'borderBottomColor')).length >= 3 &&
        (await css(tabs, '.slidev-code-tab.active', 'borderBottomWidth')) === '2px',
    );
    t.ok(
      `${l} the card header has the file name gradient`,
      (await css(snippet, '.adev-code-card-title', 'backgroundClip')).startsWith('text'),
    );
    const slideOf = (n) => pages[n - 1];
    const byPage = new Map();
    for (const check of contrastChecks(name)) {
      const list = byPage.get(check[1]) ?? [];
      list.push(check.slice(0, 1).concat(check.slice(2)));
      byPage.set(check[1], list);
    }
    for (const [n, list] of byPage)
      for (const [what, ratio, min] of await measure(slideOf(n), list))
        t.ok(`${l} contrast ${what}`, ratio >= min, `${ratio.toFixed(2)} (>= ${min})`);
  }

  // print: the copy buttons are not on paper, the cards keep their colours
  await scheme(card, 'light');
  await card.emulateMedia({ media: 'print' });
  t.ok(
    'print: the copy button is hidden',
    (await css(card, '.adev-code-card .adev-copy', 'display')) === 'none',
  );
  t.ok(
    'print: the card keeps its border',
    (await css(card, '.adev-code-card', 'borderTopWidth')) === '1px',
  );
  await fences.emulateMedia({ media: 'print' });
  t.ok(
    'print: a prefer card keeps its tint',
    (await css(fences, '.adev-prefer .adev-verdict-header', 'backgroundColor')) !==
      'rgba(0, 0, 0, 0)',
  );

  for (const p of pages) await p.close();
  t.ok('no console errors or warnings', ctx.problems.length === 0, JSON.stringify(ctx.problems));
  server.close();
} finally {
  await browser.close();
}
process.exit(t.done());
