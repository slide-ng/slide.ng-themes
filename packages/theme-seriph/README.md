# seriph

A theme with serif fonts and a blue-grey accent. Install it with `npm i -D @slide-ng/theme-seriph` and use it with `theme: seriph`.

Original design: `@slidev/theme-seriph` by [Anthony Fu](https://github.com/antfu), MIT License. The layout, CSS values and font settings are
ported to Angular; see the MIT notice in the NOTICE file at the root of this repository.

## What is ported

- Fonts (`theme.json`, loaded from the font provider like Slidev): `PT Serif` for text and headings, `PT Mono` for code, italic, weights 400 and 700.
- Colour: `themeConfig.primary`, `#5d8392` by default (in `theme.json`, as in the original), used for headings (`h1`), links on hover and the quote bar.
  With slide.ng 2.0 a deck changes it with `themeConfig: { primary: '#b5523b' }` in its headmatter, which also recolours the progress bar
  and the controls. slide.ng 1.x does not read `themeConfig`; there `--slidev-theme-primary: #5d8392` comes from `styles/index.css`.
- Layout `cover`: centered title over a dimmed `background` (a picture address or a colour), as in the original.
- `intro`, `section`, `statement`, `fact`, `quote` and `default` are the built-in layouts; the original does not change them either, only the heading colour.

## What is different

- The original's default cover is a random photo from an online collection. That photo is a licensed asset and is not used. A cover without
  `background` gets a blue-grey gradient drawn in CSS (`.seriph-cover-plain` in `styles/index.css`). Set `background:` to use your own picture.
- Code colours come from Shiki, not from the original's Prism style sheet.

No image or other asset of the original theme is part of this folder.
