# bricks

A light theme of flat coloured shapes (red, yellow, blue, pink) with a serif title font. Install it with `npm i -D @slide-ng/theme-bricks` and use it with `theme: bricks`.

Original design: `@slidev/theme-bricks` by [iiiiiiinès](https://github.com/iiiiiiines), MIT License for the code. The layouts, polygon shapes, CSS
values and font settings are ported to Angular; see the MIT notice in the NOTICE file at the root of this repository.

## What is ported

- Fonts (`theme.json`, loaded from the font provider): `Signika Negative` for text, `Sigmar One` for headings, `Fira Code` for code. Colour schema `light`.
- Layouts with the same names and slots: `cover`, `intro` (`::left::`), `default`, `section` (`::right::`), `items` (`cols`, `::items::`),
  `quote`, `fact`, `statement` and `blank`.
- The eleven shapes of the original `Polygon1` to `Polygon11` components, as `<polygon-1 />` to `<polygon-11 />` (kebab case, like Slidev also accepts).
  Their SVG paths come from the MIT licensed components. They have their natural size; change it with classes:
  `<polygon-7 class="w-20 h-20 m-auto" />` (the original used the attributes `w="20" h="20" m="auto"`, which slide.ng does not have).

## What is different

- The original draws the layout backgrounds with ten SVG illustrations (`assets/page-*.svg`). They are assets under CC BY-NC-SA 4.0 (non-commercial) and
  are not used. Each layout here has a few flat circles, half circles and triangles in the same palette, written as CSS gradients
  (`.bricks-bg-*` in `styles/index.css`).
- Code colours come from Shiki, not from the original's Prism style sheet.

No image or other asset of the original theme is part of this folder.
