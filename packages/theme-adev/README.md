# adev

The look of [angular.dev](https://angular.dev), the Angular documentation site: Inter type, hairline grey borders, four pixel corners, the pink to purple to blue gradient used sparingly, and callouts, cards and code blocks drawn like the docs. Light and dark. Install it with `npm i -D @slide-ng/theme-adev` and use it with `theme: adev`.

This theme is inspired by angular.dev. It is not an official Angular theme, and slide.ng is a community project that is not affiliated with or endorsed by Google or the Angular team.

## What is taken from adev

- Tokens: the grey scale (`gray-1000` to `gray-50`), the accent colours (bright blue, electric violet, vivid pink, hot pink, orange red) and the dark mode mixes, as `--adev-*` CSS variables in `styles/tokens.css`. Light and dark are set by the theme's own switch (see below).
- Fonts (`theme.json`, from the font provider): `Inter` for text, `Inter Tight` for headings, `DM Mono` for code, weights 400 and 500.
- Gradients: the hero (hot pink to electric violet) on `cover`, `end` and the picture side of `image-left` and `image-right`; the red, pink, purple text gradient on `intro`, `fact` and stat numbers; the pink to purple ring of numbered steps and `adev-button`.
- Code: the same Shiki themes as angular.dev, `github-light` and `github-dark`, set in `theme.json` (white panel with dark text in light, `#24292e` panel with `#e1e4e8` text in dark, as in angular.dev's `docs-light-mode` and `docs-dark-mode`). A hairline border, 14px DM Mono, and a header bar with the file name in the purple to blue gradient (a fence title such as `[app.ts]`, or `<adev-code-card>`). Inline code is hot pink on a light purple tint.
- Callouts, cards, buttons, steps, tables and links follow the docs styles.

## Layouts

`cover`, `intro`, `default`, `center`, `section`, `two-cols`, `image-right`, `image-left`, `quote`, `fact`, `statement` and `end`. The other built-in layouts (`two-cols-header`, `full`, `image`, `iframe`, `none`) pick up the colours and type from the CSS.

`cover` keeps the `background` input. `image-left` and `image-right` draw the gradient picture side when no `image` is set.

## Light and dark

Both schemes are complete and follow angular.dev's light and dark: every layout, component, callout tint, gradient, border and code colour has a variant for each. The theme has its own switch, a small sun or moon button in the top right corner of every slide (`aria-label` "Switch slide colour scheme", a toggle button that works from the keyboard). It only recolours the slides: the slide.ng dock, its menus and the page colour schema (`colorSchema`, the sun button of the dock) are not touched, and the theme does not react to them.

The scheme is an attribute on the page, `data-adev-scheme="light|dark"`. The first value is the choice stored in `localStorage` (key `adev-scheme`), else the system preference, else light, so `slide-ng export --dark` starts dark. Every change is stored, and the presenter and the main window follow each other. The button is not drawn in print, export, overview or the next-slide preview, but those use the same scheme. The hero panels (`cover`, `end`, the picture side of the image layouts) look the same in both, as on angular.dev. The tests check the layouts, components, code colours and text contrast in both schemes by setting the attribute, and that the button leaves the dock alone.

## Angular support built in

Angular code is highlighted out of the box, with no setup file: the theme loads the `angular-ts` and `angular-html` grammars (`setup/shiki.ts`) and adds the fence names `ng-ts`, `ng-html` and `angular` (`ng` works in slide.ng already). `@Component` decorators with inline templates, control flow (`@if`, `@for`, `@defer`, `@switch`), bindings, `{{ }}` and pipes are coloured like on angular.dev. A deck that sets its own `codeAliases` replaces these names.

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
