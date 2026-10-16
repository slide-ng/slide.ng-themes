# adev

The look of [angular.dev](https://angular.dev), the Angular documentation site: Inter type, hairline grey borders, four pixel corners, the pink to purple to blue gradient used sparingly, and callouts, cards and code blocks drawn like the docs. Light and dark. Install it with `npm i -D @slide-ng/theme-adev` and use it with `theme: adev`.

This theme is inspired by angular.dev. It is not an official Angular theme, and slide.ng is a community project that is not affiliated with or endorsed by Google or the Angular team.

## What is taken from adev

- Tokens: the grey scale (`gray-1000` to `gray-50`), the accent colours (bright blue, electric violet, vivid pink, hot pink, orange red) and the dark mode mixes, as `--adev-*` CSS variables in `styles/tokens.css`. Light and dark follow slide.ng's colour schema (`html.dark`).
- Fonts (`theme.json`, from the font provider): `Inter` for text, `Inter Tight` for headings, `DM Mono` for code, weights 400 and 500.
- Gradients: the hero (hot pink to electric violet) on `cover`, `end` and the picture side of `image-left` and `image-right`; the red, pink, purple text gradient on `intro`, `fact` and stat numbers; the pink to purple ring of numbered steps and `adev-button`.
- Code: a grey panel with a hairline border and a header bar for the file name (` ```ts [app.ts] ` or `<adev-code-card>`). Inline code is hot pink on a light purple tint.
- Callouts, cards, buttons, steps, tables and links follow the docs styles.

## Layouts

`cover`, `intro`, `default`, `center`, `section`, `two-cols`, `image-right`, `image-left`, `quote`, `fact`, `statement` and `end`. The other built-in layouts (`two-cols-header`, `full`, `image`, `iframe`, `none`) pick up the colours and type from the CSS.

`cover` keeps the `background` input. `image-left` and `image-right` draw the gradient picture side when no `image` is set.

## Light and dark

The deck follows the colour schema as usual (`colorSchema: auto | light | dark`). One slide can be forced with `class: dark` or `class: light` in its frontmatter; for `two-cols` use `layoutClass: dark`.

## Components

| Tag                                          | What it is                                                                                      |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `<adev-callout type="note" title="...">`     | A callout with a gradient rail. Types: `note`, `tip`, `important`, `warning`, `critical`        |
| `<adev-card-grid cols="3">`, `<adev-card>`   | A grid of cards. `<adev-card label="Step 1" title="Fork" hot>` (`hot` adds the gradient border) |
| `<adev-stat value="15+" label="PRs">`        | A big gradient number with a label                                                              |
| `<adev-count-up to="240" suffix="+">`        | A number that counts up when its slide appears (shows the final value in print and previews)    |
| `<adev-code-card title="app.ts" label="TS">` | A file header over a fenced code block                                                          |
| `<adev-steps>`                               | An ordered list with numbered gradient rings                                                    |
| `<adev-button variant="secondary">`          | The primary (gradient outline) or secondary button                                              |

## What is different

- The Angular logo, the wordmark and the mascot are not included. Decks that use them must credit Angular (CC BY 4.0) and follow the press kit.
- Icons in callouts are drawn as SVG paths for this package; angular.dev uses the Material Symbols font.
- Fonts load from the provider only 400 and 500 weights (one list covers all three families), so bold text is the medium weight.

See the NOTICE file for the credits and licences. `examples/adev.md` in the themes repository shows every layout and component in light and dark.
