// WCAG contrast of the adev theme: text colours on the surfaces they sit on, in the light and the dark scheme.
// Each pair is [name, text colour, surface colour, smallest ratio]; 4.5 for text, 3 for large text and graphics.
const SURFACES = {
  page: 'var(--adev-page)',
  panel: 'var(--adev-code-bg)',
  header: 'var(--adev-subtle-purple)',
  inlineCode: 'var(--adev-subtle-purple)',
  quote: 'color-mix(in srgb, var(--adev-vivid-pink) 5%, var(--adev-page))',
  card: 'color-mix(in srgb, var(--adev-vivid-pink) 6%, var(--adev-page))',
  heroPink: '#e90464',
  heroViolet: '#8514f5',
  heroMiddle: 'color-mix(in srgb, #e90464 50%, #8514f5)',
};
const GITHUB = {
  light: {
    keyword: '#d73a49',
    string: '#032f62',
    function: '#6f42c1',
    type: '#005cc5',
    tag: '#22863a',
    constant: '#e36209',
  },
  dark: {
    keyword: '#f97583',
    string: '#9ecbff',
    function: '#b392f0',
    type: '#79b8ff',
    tag: '#85e89d',
    constant: '#ffab70',
  },
};

const TOKENS = Object.entries(GITHUB).flatMap(([scheme, colours]) =>
  Object.entries(colours).map(([kind, colour]) => [
    `code ${kind} on the panel`,
    colour,
    'panel',
    kind === 'constant' ? 3 : 4.5,
    scheme,
  ]),
);

const PAIRS = [
  ...TOKENS,
  ['text on page', 'var(--adev-primary)', 'page', 4.5],
  ['secondary text on page', 'var(--adev-tertiary)', 'page', 4.5],
  ['muted text on page', 'var(--adev-quaternary)', 'page', 4.5],
  ['link on page', 'var(--adev-link)', 'page', 4.5],
  ['kicker on page', 'var(--adev-kicker)', 'page', 4.5],
  ['text on code panel', 'var(--adev-primary)', 'panel', 4.5],
  ['file name start on code header', 'var(--adev-electric-violet)', 'header', 4.5],
  ['file name end on code header', 'var(--adev-bright-blue)', 'header', 4.5],
  ['language label on code header', 'var(--adev-tertiary)', 'header', 4.5],
  ['inline code', 'var(--adev-code-ink)', 'inlineCode', 4.5],
  ['quote text', 'var(--adev-primary)', 'quote', 4.5],
  ['quote author', 'var(--adev-tertiary)', 'quote', 4.5],
  ['card label', 'var(--adev-kicker)', 'card', 4.5],
  ['card body', 'var(--adev-tertiary)', 'card', 4.5],
  ...['orange-red', 'vivid-pink', 'electric-violet'].map((c) => [
    `gradient text stop ${c} on page`,
    `var(--adev-${c})`,
    'page',
    3,
  ]),
  ...['heroPink', 'heroViolet', 'heroMiddle'].map((h) => [`white text on ${h}`, '#fff', h, 4.5]),
];

// Chromium paints the pair to a canvas, which turns oklch() and color-mix() into plain sRGB.
export async function measure(page, selector, scheme) {
  return page
    .locator(selector)
    .first()
    .evaluate(
      (root, { pairs, surfaces }) => {
        const ctx = Object.assign(document.createElement('canvas'), {
          width: 1,
          height: 1,
        }).getContext('2d', {
          willReadFrequently: true,
        });
        const probe = document.createElement('div');
        root.appendChild(probe);
        const rgb = (css, prop) => {
          probe.style.cssText = `${prop}: ${css}`;
          const value = getComputedStyle(probe)[prop];
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = '#000';
          ctx.fillStyle = value;
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
          const b = lum(rgb(surfaces[surface], 'background-color'));
          return [name, (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), min];
        });
        probe.remove();
        return out;
      },
      { pairs: PAIRS.filter((pair) => !pair[4] || pair[4] === scheme), surfaces: SURFACES },
    );
}
