# apple-basic

A plain white theme after Keynote's "Basic White": Helvetica Neue, bold headings, photo layouts. Install it with `npm i -D @slide-ng/theme-apple-basic` and use it with `theme: apple-basic`.

Original design: `@slidev/theme-apple-basic` by [Jeremy Meissner](https://github.com/JeremyMeissner), MIT License. The layouts, names, props, CSS
values and font settings are ported to Angular; see the MIT notice in the NOTICE file at the root of this repository.

## What is ported

- Font (`theme.json`): `Helvetica Neue`, named as a local font, so nothing is downloaded.
- Layouts with the same names and props: `intro`, `intro-image` (`image`), `intro-image-right` (`image`), `image-right` (`image`), `bullets`,
  `section`, `statement`, `fact`, `quote` and `3-images` (`imageLeft`, `imageTopRight`, `imageBottomRight`). `default` (title and bullets) is the
  built-in layout with the theme's heading style. The layouts `image` and `center` are the built-in ones.
- Bold `h1`/`h2`, small uppercase `h3`, text that cannot be selected except code, as in the original.

## What is different

- Picture values are used as they are (an address, or a colour such as `#4a6fa5`). The theme has no pictures of its own.
- Code colours come from Shiki, not from the original's Prism style sheet.

No image or other asset of the original theme is part of this folder.
