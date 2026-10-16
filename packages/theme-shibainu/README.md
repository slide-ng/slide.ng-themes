# shibainu

A dark theme in brown and tan with a light grey text colour. Install it with `npm i -D @slide-ng/theme-shibainu` and use it with `theme: shibainu`.

Original design: `@slidev/theme-shibainu` by [iiiiiiinès](https://github.com/iiiiiiines), MIT License for the code. The layouts, names, CSS values
and font settings are ported to Angular; see the MIT notice in the NOTICE file at the root of this repository.

## What is ported

- Fonts (`theme.json`, loaded from the font provider): `Titillium Web` for text, `Fira Code` for code. Colour schema `dark` by default.
- Colours: text `#402312` on light backgrounds, `#EBEEF2` on dark ones, the brown and tan palette of the original.
- Small uppercase `h3`, and a 4em title in `quote` and a 3em title in `section-3`, as in the original.
- Layouts, with the same names and content boxes: `cover`, `default`, `center`, `section`, `section-2`, `section-3`, `default-2` to `default-7`, `right`, `quote`.
  `default-3` sends the slide's `class` to its content box (`classProp` in `theme.json`).

## What is different

- The original draws every background with a vector illustration. Those illustrations are assets under CC BY-NC-SA 4.0 (non-commercial) and
  are not used. Each layout here has its own background made of flat circles and ellipses in the same colours, written as CSS gradients
  (`.shibainu-bg-*` in `styles/index.css`). The look is close in colour and mood, not in shape.
- Code colours come from Shiki, not from the original's Prism style sheet.

No image or other asset of the original theme is part of this folder.
