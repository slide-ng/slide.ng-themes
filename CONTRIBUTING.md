# Contributing

Thanks for helping. The rules of a theme are in slide.ng's `docs/THEMES.md` and `docs/WRITING-A-THEME.md`.

## Setup

```sh
npm install
SLIDE_NG_DIR=../slide.ng npm test
```

Node 22 (see `.nvmrc`). The tests need a slide.ng checkout and Chromium, see the README.

## Add a theme

1. Make `packages/theme-<name>/` with `theme.json`, `layouts/`, `styles/index.css` and, if needed, `components/`.
2. Copy the `package.json` of an existing package: name `@slide-ng/theme-<name>`, `slide-ng` as a peer dependency,
   `files`, and the keywords `slide-ng-theme` and `slide-ng`.
3. Write a `README.md` for the package: what it looks like, what is ported, what is different, and the credit to the original author.
4. Add `examples/<name>.md`, a deck with `theme: <name>` and one slide for every layout (`layout: <layout>`).
5. Add the theme to the table in the root README and to `tests/themes.mjs` (the layout tags, a computed style or two, the fonts).
6. Run `npm run format` and `npm test`.

## Rules

- Original code under MIT can be ported, with credit in the package README and in `NOTICE`.
- Do not copy images, fonts or other assets that are not MIT or compatible (for example CC BY-NC-SA). Draw it in CSS or leave it out.
- Keep files small and comments short and plain.
- One change per pull request, with a test where it makes sense.
