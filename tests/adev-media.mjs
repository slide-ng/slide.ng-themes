// Browser test of the adev media components (tabs, images, video, Mermaid) against examples/adev-media.md.
// It builds the deck with the slide.ng command line (SLIDE_NG_DIR, default ../slide.ng), opens every slide in Chromium,
// switches data-adev-scheme on <html> and checks computed colours, keyboard use, print output and WCAG contrast.
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

const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;
const SCHEMES = {
  light: {
    primary: rgb(21, 20, 23),
    quaternary: rgb(116, 110, 124),
    hairline: rgb(228, 227, 230),
    node: rgb(246, 245, 246),
    page: rgb(255, 255, 255),
  },
  dark: {
    primary: rgb(251, 251, 251),
    quaternary: rgb(163, 159, 169),
    hairline: rgb(65, 62, 70),
    node: rgb(35, 33, 37),
    page: rgb(15, 15, 17),
  },
};
const PIE_SLICES = 8;

const SURFACES = {
  page: 'var(--adev-page)',
  poster: 'var(--adev-septenary)',
  posterTint: 'color-mix(in srgb, var(--adev-vivid-pink) 18%, var(--adev-septenary))',
  node: 'var(--adev-septenary)',
  ...Object.fromEntries(
    Array.from({ length: PIE_SLICES }, (_, i) => [`chart${i + 1}`, `var(--adev-chart-${i + 1})`]),
  ),
};
const PAIRS = [
  ['active tab text on page', 'var(--adev-primary)', 'page', 4.5],
  ['inactive tab text on page', 'var(--adev-quaternary)', 'page', 4.5],
  ['tab print label on page', 'var(--adev-kicker)', 'page', 4.5],
  ['image caption on page', 'var(--adev-quaternary)', 'page', 4.5],
  ['video title on poster', 'var(--adev-primary)', 'poster', 4.5],
  ['video title on tinted poster', 'var(--adev-primary)', 'posterTint', 4.5],
  ['video play icon on its button', 'var(--adev-page)', ['var(--adev-primary)'], 3],
  ['video play icon on hover', 'var(--adev-page)', ['var(--adev-hot-pink)'], 3],
  ['diagram text on node', 'var(--adev-primary)', 'node', 4.5],
  ['diagram text on page', 'var(--adev-primary)', 'page', 4.5],
  ['diagram line on page', 'var(--adev-quaternary)', 'page', 3],
  ['diagram node border on page', 'var(--adev-quaternary)', 'page', 3],
  ...Array.from({ length: PIE_SLICES }, (_, i) => [
    `pie slice ${i + 1} text`,
    'var(--adev-chart-ink)',
    `chart${i + 1}`,
    4.5,
  ]),
  ...Array.from({ length: PIE_SLICES }, (_, i) => [
    `pie slice ${i + 1} on page`,
    `var(--adev-chart-${i + 1})`,
    'page',
    3,
  ]),
];

// Chromium paints each colour to a canvas, which turns oklch() and color-mix() into plain sRGB.
function measure(page) {
  return page.evaluate(
    ({ pairs, surfaces }) => {
      const ctx = Object.assign(document.createElement('canvas'), {
        width: 1,
        height: 1,
      }).getContext('2d', { willReadFrequently: true });
      const probe = document.createElement('div');
      document.body.appendChild(probe);
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
      const out = pairs.map(([name, fg, surface, min]) => {
        const a = lum(rgb(fg, 'color'));
        const css = Array.isArray(surface) ? surface[0] : surfaces[surface];
        const b = lum(rgb(css, 'background-color'));
        return [name, (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), min];
      });
      probe.remove();
      return out;
    },
    { pairs: PAIRS, surfaces: SURFACES },
  );
}

const t = reporter();
const scratch = mkdtempSync(join(tmpdir(), 'slide-ng-adev-media-'));
const env = {
  ...process.env,
  CHROME_PATH: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
};
const dist = join(scratch, 'site');
execFileSync(
  process.execPath,
  [bin, 'build', join(root, 'examples/adev-media.md'), '--out', dist],
  {
    stdio: 'inherit',
    env,
  },
);

const browser = await launch();
const { server, port } = await serve(dist);
const ctx = makeContext(`http://localhost:${port}`, browser, t);
const sized = { width: 1280, height: 720 };
const external = [];
const prepare = async (page) => {
  await page.route(/^https:\/\/(?!localhost)/, (route) => {
    const url = route.request().url();
    if (url.includes('fonts.googleapis.com'))
      return route.fulfill({ status: 200, contentType: 'text/css', body: '' });
    external.push(url);
    route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><p>video</p>' });
  });
};
const open = (n, scheme = 'light') =>
  ctx.open(`/${n}`, sized, async (page) => {
    await prepare(page);
    await page.addInitScript((s) => localStorage.setItem('adev-scheme', s), scheme);
  });
const setScheme = async (page, scheme) => {
  await page.evaluate((s) => (document.documentElement.dataset.adevScheme = s), scheme);
  await page.waitForTimeout(400);
};
const style = (page, selector, prop) => ctx.style(page, selector, prop);
const selectedLabels = async (page) => {
  await page.waitForTimeout(100);
  return page.evaluate(() =>
    [...document.querySelectorAll('[role=tab]')]
      .filter((e) => e.getAttribute('aria-selected') === 'true')
      .map((e) => e.textContent.trim()),
  );
};
const visiblePanels = async (page) => {
  await page.waitForTimeout(100);
  return page.evaluate(() =>
    [...document.querySelectorAll('adev-tab')]
      .filter((e) => getComputedStyle(e).display !== 'none')
      .map((e) => e.textContent.trim().slice(0, 12)),
  );
};

try {
  // 1. Tabs
  {
    const page = await open(1);
    t.ok('the deck has 8 slides', /slide 1\/8/.test(await ctx.hud(page)), await ctx.hud(page));
    t.ok(
      'tabs: a tablist with three tabs',
      (await page.locator('[role=tablist] [role=tab]').count()) === 3,
    );
    t.ok('tabs: three tabpanels', (await page.locator('[role=tabpanel]').count()) === 3);
    t.ok(
      'tabs: the first tab is selected and its panel shown',
      (await selectedLabels(page)).join() === 'npm' && (await visiblePanels(page)).length === 1,
    );
    t.ok(
      'tabs: each tab controls a panel labelled by it',
      await page.evaluate(() =>
        [...document.querySelectorAll('[role=tab]')].every((tab) => {
          const panel = document.getElementById(tab.getAttribute('aria-controls'));
          return panel?.getAttribute('aria-labelledby') === tab.id;
        }),
      ),
    );
    t.ok(
      'tabs: only the selected tab is in the tab order',
      await page.evaluate(
        () =>
          [...document.querySelectorAll('[role=tab]')].map((e) => e.tabIndex).join() === '0,-1,-1',
      ),
    );
    await page.getByRole('tab', { name: 'pnpm' }).click();
    t.ok(
      'tabs: a click selects the tab and shows only its panel',
      (await selectedLabels(page)).join() === 'pnpm' &&
        (await visiblePanels(page)).join().startsWith('pnpm'),
      (await visiblePanels(page)).join(),
    );
    await page.getByRole('tab', { name: 'pnpm' }).focus();
    await ctx.press(page, 'ArrowRight');
    t.ok(
      'tabs: ArrowRight selects and focuses the next tab',
      (await selectedLabels(page)).join() === 'Some text' &&
        (await page.evaluate(() => document.activeElement.textContent.trim())) === 'Some text',
    );
    await ctx.press(page, 'ArrowRight');
    t.ok('tabs: ArrowRight wraps to the first tab', (await selectedLabels(page)).join() === 'npm');
    await ctx.press(page, 'ArrowLeft');
    t.ok(
      'tabs: ArrowLeft wraps to the last tab',
      (await selectedLabels(page)).join() === 'Some text',
    );
    await ctx.press(page, 'Home');
    t.ok('tabs: Home selects the first tab', (await selectedLabels(page)).join() === 'npm');
    await ctx.press(page, 'End');
    t.ok('tabs: End selects the last tab', (await selectedLabels(page)).join() === 'Some text');
    t.ok(
      'tabs: the arrow keys did not move the slide',
      ctx.pathOf(page) === '/1' && /slide 1\//.test(await ctx.hud(page)),
    );
    await page.getByRole('tab', { name: 'npm', exact: true }).click();
    for (const [scheme, c] of Object.entries(SCHEMES)) {
      await setScheme(page, scheme);
      t.ok(
        `tabs ${scheme}: selected tab colour`,
        (await style(page, '.adev-tab-active', 'color')) === c.primary,
        await style(page, '.adev-tab-active', 'color'),
      );
      t.ok(
        `tabs ${scheme}: unselected tab colour`,
        (await style(page, '.adev-tab:not(.adev-tab-active)', 'color')) === c.quaternary,
      );
      t.ok(
        `tabs ${scheme}: the bar has a hairline`,
        (await style(page, '.adev-tab-list', 'borderBottomWidth')) === '1px',
      );
      t.ok(
        `tabs ${scheme}: the selected tab has the gradient underline`,
        /gradient/.test(
          await page.evaluate(
            () =>
              getComputedStyle(document.querySelector('.adev-tab-active'), '::after')
                .backgroundImage,
          ),
        ),
      );
      for (const [name, ratio, min] of (await measure(page)).filter(([n]) => /tab/.test(n)))
        t.ok(`tabs ${scheme}: contrast ${name}`, ratio >= min, `${ratio.toFixed(2)} (>= ${min})`);
    }
    await page.close();
  }

  // 2. Tabs, one per click
  {
    const page = await open(2);
    t.ok(
      'tabs clicks: two clicks on the slide',
      /clicks 0\/2/.test(await ctx.hud(page)),
      await ctx.hud(page),
    );
    t.ok(
      'tabs clicks: the first tab shows first',
      (await selectedLabels(page)).join() === 'Define',
    );
    await ctx.press(page, 'ArrowRight');
    t.ok(
      'tabs clicks: a click shows the second tab',
      (await selectedLabels(page)).join() === 'Derive',
    );
    await ctx.press(page, 'ArrowRight');
    t.ok(
      'tabs clicks: another click shows the third tab',
      (await selectedLabels(page)).join() === 'React',
    );
    t.ok('tabs clicks: still on the same slide', ctx.pathOf(page) === '/2');
    await ctx.press(page, 'ArrowLeft');
    t.ok(
      'tabs clicks: going back shows the second tab',
      (await selectedLabels(page)).join() === 'Derive',
    );
    await page.getByRole('tab', { name: 'Define' }).click();
    t.ok(
      'tabs clicks: a tab can also be clicked',
      (await selectedLabels(page)).join() === 'Define',
    );
    await page.close();
  }

  // 3. Markdown images
  for (const [scheme, c] of Object.entries(SCHEMES)) {
    const page = await open(3, scheme);
    await setScheme(page, scheme);
    t.ok('images: two markdown images', (await page.locator('.slidev-layout img').count()) === 2);
    t.ok(
      'images: #small limits the width',
      (await style(page, 'img[src$="#small"]', 'maxWidth')) === '250px',
    );
    t.ok(
      'images: #medium limits the width',
      (await style(page, 'img[src$="#medium"]', 'maxWidth')) === '450px',
    );
    t.ok(
      `images ${scheme}: rounded corners and hairline`,
      (await style(page, 'img', 'borderTopLeftRadius')) === '4px' &&
        (await style(page, 'img', 'borderTopWidth')) === '1px' &&
        (await style(page, 'img', 'borderTopColor')) === c.hairline,
      await style(page, 'img', 'borderTopColor'),
    );
    t.ok(
      `images ${scheme}: the picture loaded`,
      await page.evaluate(() =>
        [...document.images].every((i) => i.complete && i.naturalWidth > 0),
      ),
    );
    await page.close();
  }

  // 4. <adev-image>
  for (const [scheme, c] of Object.entries(SCHEMES)) {
    const page = await open(4, scheme);
    await setScheme(page, scheme);
    t.ok(
      'adev-image: a picture with a caption',
      (await page.locator('adev-image .adev-image-caption').count()) === 1,
    );
    t.ok(
      'adev-image: size="medium" limits the width',
      (await style(page, '.adev-image-img', 'maxWidth')) === '450px',
    );
    t.ok(
      `adev-image ${scheme}: caption colour`,
      (await style(page, '.adev-image-caption', 'color')) === c.quaternary,
    );
    t.ok(
      `adev-image ${scheme}: rounded corners and hairline`,
      (await style(page, '.adev-image-img', 'borderTopLeftRadius')) === '4px' &&
        (await style(page, '.adev-image-img', 'borderTopColor')) === c.hairline,
    );
    for (const [name, ratio, min] of (await measure(page)).filter(([n]) => /caption/.test(n)))
      t.ok(
        `adev-image ${scheme}: contrast ${name}`,
        ratio >= min,
        `${ratio.toFixed(2)} (>= ${min})`,
      );
    await page.close();
  }

  // 5. Video
  {
    const page = await open(5);
    t.ok(
      'video: a poster button, no iframe before a click',
      (await page.locator('button.adev-video-poster').count()) === 1 &&
        (await page.locator('iframe').count()) === 0,
    );
    t.ok(
      'video: nothing was requested from the web before a click',
      external.length === 0,
      external.join(),
    );
    t.ok(
      'video: the button names the video',
      /Expression changed after checked/.test(
        await page.locator('button.adev-video-poster').getAttribute('aria-label'),
      ),
    );
    const box = await page.locator('.adev-video-frame').boundingBox();
    t.ok(
      'video: the frame is 16:9',
      Math.abs(box.width / box.height - 16 / 9) < 0.02,
      `${box.width}x${box.height}`,
    );
    t.ok(
      'video: rounded corners and hairline',
      (await style(page, '.adev-video-frame', 'borderTopLeftRadius')) === '4px' &&
        (await style(page, '.adev-video-frame', 'borderTopWidth')) === '1px',
    );
    for (const [scheme, c] of Object.entries(SCHEMES)) {
      await setScheme(page, scheme);
      t.ok(
        `video ${scheme}: the frame border is the hairline colour`,
        (await style(page, '.adev-video-frame', 'borderTopColor')) === c.hairline,
      );
      t.ok(
        `video ${scheme}: the title colour`,
        (await style(page, '.adev-video-poster', 'color')) === c.primary,
      );
      for (const [name, ratio, min] of (await measure(page)).filter(([n]) => /video/.test(n)))
        t.ok(`video ${scheme}: contrast ${name}`, ratio >= min, `${ratio.toFixed(2)} (>= ${min})`);
    }
    await page.locator('button.adev-video-poster').click();
    await page.waitForSelector('iframe.adev-video-iframe');
    const iframe = page.locator('iframe.adev-video-iframe');
    t.ok(
      'video: a click loads the embed from the no-cookie host, lazily',
      /^https:\/\/www\.youtube-nocookie\.com\/embed\/O47uUnJjbJc/.test(
        await iframe.getAttribute('src'),
      ) &&
        (await iframe.getAttribute('loading')) === 'lazy' &&
        (await iframe.getAttribute('title')) === 'Expression changed after checked',
      await iframe.getAttribute('src'),
    );
    await page.close();
  }

  // 6-8. Mermaid, re-coloured when the scheme changes after the drawing
  for (const [n, kind] of [
    [6, 'flowchart'],
    [7, 'sequence'],
    [8, 'pie'],
  ]) {
    const page = await open(n, 'light');
    await page.waitForSelector('.mermaid svg');
    t.ok(`mermaid ${kind}: drawn`, (await page.locator('.mermaid svg').count()) === 1);
    const probe = {
      flowchart: ['.node rect', 'fill'],
      sequence: ['rect.actor', 'fill'],
      pie: ['.pieCircle', 'fill'],
    }[kind];
    for (const scheme of ['light', 'dark', 'light']) {
      await setScheme(page, scheme);
      const c = SCHEMES[scheme];
      const text = {
        flowchart: '.nodeLabel',
        sequence: 'text.actor > tspan',
        pie: '.pieTitleText',
      }[kind];
      if (kind !== 'pie')
        t.ok(
          `mermaid ${kind} ${scheme}: shape fill follows the scheme`,
          (await style(page, probe[0], probe[1])) === c.node,
          await style(page, probe[0], probe[1]),
        );
      t.ok(
        `mermaid ${kind} ${scheme}: text colour follows the scheme`,
        kind === 'flowchart'
          ? (await style(page, text, 'color')) === c.primary
          : (await style(page, text, 'fill')) === c.primary,
        kind === 'flowchart' ? await style(page, text, 'color') : await style(page, text, 'fill'),
      );
      t.ok(
        `mermaid ${kind} ${scheme}: the font is Inter`,
        /Inter/.test(await style(page, text, 'fontFamily')),
      );
      if (kind === 'pie') {
        const fills = await page.evaluate(() =>
          [...document.querySelectorAll('.pieCircle')].map((e) => getComputedStyle(e).fill),
        );
        t.ok(
          `mermaid pie ${scheme}: three distinct slice colours`,
          new Set(fills).size === 3,
          fills.join(' | '),
        );
        const legend = await page.evaluate(() =>
          [...document.querySelectorAll('.legend rect')].map((e) => getComputedStyle(e).fill),
        );
        t.ok(
          `mermaid pie ${scheme}: the legend swatches match the slices`,
          legend.join() === fills.join(),
          `${legend.join(' | ')}`,
        );
        const expect = await page.evaluate(() =>
          [1, 2, 3].map((i) => {
            const probe = document.createElement('i');
            probe.style.fill = `var(--adev-chart-${i})`;
            document.body.append(probe);
            const v = getComputedStyle(probe).fill;
            probe.remove();
            return v;
          }),
        );
        t.ok(
          `mermaid pie ${scheme}: slices use the chart tokens`,
          fills.join() === expect.join(),
          `${fills.join(' | ')} vs ${expect.join(' | ')}`,
        );
      }
      t.ok(
        `mermaid ${kind} ${scheme}: no shadow filter on the shapes`,
        await page.evaluate(() =>
          [...document.querySelectorAll('.mermaid rect, .mermaid polygon')].every(
            (e) => getComputedStyle(e).filter === 'none',
          ),
        ),
      );
    }
    for (const scheme of ['light', 'dark']) {
      await setScheme(page, scheme);
      for (const [name, ratio, min] of (await measure(page)).filter(
        ([x]) => /diagram|pie/.test(x) && (kind === 'pie' || !/pie/.test(x)),
      ))
        t.ok(
          `mermaid ${kind} ${scheme}: contrast ${name}`,
          ratio >= min,
          `${ratio.toFixed(2)} (>= ${min})`,
        );
    }
    await page.close();
  }

  // A diagram drawn in the dark scheme from the start uses the dark colours too (the Mermaid theme variables)
  {
    const page = await open(6, 'dark');
    await page.waitForSelector('.mermaid svg');
    const css = await page.evaluate(() => document.querySelector('.mermaid svg style').textContent);
    t.ok(
      'mermaid: the theme variables follow the dark scheme at the first drawing',
      /#232125/i.test(css) && /#fbfbfb|#151417/i.test(css),
    );
    await page.close();
  }

  // Print: tabs are stacked with their labels, the video is a placeholder card
  {
    const page = await browser.newPage({ viewport: sized });
    page.on('console', (m) => {
      if (['error', 'warning'].includes(m.type())) ctx.problems.push(`${m.type()}: ${m.text()}`);
    });
    await prepare(page);
    await page.goto(`${ctx.base}/print`);
    await page.waitForSelector('.adev-video-poster');
    await page.waitForTimeout(500);
    const info = await page.evaluate(() => {
      const group = document.querySelector('adev-tab-group');
      const panels = [...group.querySelectorAll('adev-tab')];
      return {
        tablist: group.querySelectorAll('[role=tablist]').length,
        shown: panels.filter((p) => getComputedStyle(p).display !== 'none').length,
        total: panels.length,
        labels: [...group.querySelectorAll('.adev-tab-print-label')]
          .map((e) => e.textContent.trim())
          .join(),
        iframes: document.querySelectorAll('iframe').length,
        posterTitle: document
          .querySelector('.adev-video-poster .adev-video-title')
          ?.textContent.trim(),
        posterDisabled: document.querySelector('button.adev-video-poster')?.disabled,
      };
    });
    t.ok(
      'print: all tab panels are stacked, no tab bar',
      info.tablist === 0 && info.shown === info.total && info.total === 3,
      JSON.stringify(info),
    );
    t.ok(
      'print: every stacked panel has its label',
      info.labels === 'npm,pnpm,Some text',
      info.labels,
    );
    t.ok(
      'print: the video is a placeholder card with its title and no iframe',
      info.iframes === 0 &&
        info.posterTitle === 'Expression changed after checked' &&
        info.posterDisabled === true,
    );
    await page.close();
  }

  t.ok('no console errors or warnings', ctx.problems.length === 0, JSON.stringify(ctx.problems));
} finally {
  server.close();
  await browser.close();
}
process.exit(t.done());
