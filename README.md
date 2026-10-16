# slide.ng themes

The official themes of [slide.ng](https://github.com/slide-ng/slide.ng), one npm package each. They are ports of the official
[Slidev themes](https://github.com/slidevjs/themes), rebuilt for slide.ng's theme contract (layouts, components and CSS as Angular code).

| Theme         | Package                                                     | Original                                             | Layouts                                       |
| ------------- | ----------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| `seriph`      | [`@slide-ng/theme-seriph`](packages/theme-seriph)           | [Anthony Fu](https://github.com/antfu)               | `cover` (plus the built-in layouts, restyled) |
| `shibainu`    | [`@slide-ng/theme-shibainu`](packages/theme-shibainu)       | [iiiiiiinès](https://github.com/iiiiiiines)          | 14                                            |
| `bricks`      | [`@slide-ng/theme-bricks`](packages/theme-bricks)           | [iiiiiiinès](https://github.com/iiiiiiines)          | 9, and `<polygon-1 />` to `<polygon-11 />`    |
| `apple-basic` | [`@slide-ng/theme-apple-basic`](packages/theme-apple-basic) | [Jeremy Meissner](https://github.com/JeremyMeissner) | 10                                            |

`default` is not here: it is the built-in look of slide.ng.

## Install and use

```sh
npm i -D @slide-ng/theme-seriph
```

```yaml
---
theme: seriph
---
```

slide.ng looks for `theme: seriph` in `node_modules` as `@slide-ng/theme-seriph`, then `slide-ng-theme-seriph`, then `seriph`.
If none is installed, the build stops and prints the install command. `examples/<name>.md` shows every layout of each theme.

## Develop

```sh
npm install                 # links the packages into node_modules/@slide-ng
npm test                    # package checks, then a browser test of every theme
npm run format:check
```

The tests need a checkout of slide.ng with its dependencies installed and a Chromium (`CHROME_PATH`, or the path used by slide.ng's
own tests). The checkout is found with the environment variable `SLIDE_NG_DIR` (default: `../slide.ng`, next to this repository):

```sh
SLIDE_NG_DIR=/path/to/slide.ng npm test
```

The browser test builds each deck in `examples/` with `slide.ng`'s command line, opens every slide and checks the layout, a few
computed styles, the fonts and a PNG export. It reuses the browser helpers of slide.ng's `tests/e2e`.

## Credits and licence

Layout names, slots, CSS values and font settings follow the Slidev themes, which are MIT licensed (Copyright (c) 2021 Slidev.js Team).
The designs are by Anthony Fu (seriph), iiiiiiinès (shibainu, bricks) and Jeremy Meissner (apple-basic). The Angular code is new.
The images of the originals are CC BY-NC-SA 4.0 and are not copied here; the ports draw CSS gradients instead (see [NOTICE](NOTICE)).

This repository is MIT licensed, see [LICENSE](LICENSE).

## Related repositories

- [slide.ng](https://github.com/slide-ng/slide.ng): the presentation tool itself.
- [slide.ng-themes](https://github.com/slide-ng/slide.ng-themes): the official themes (this repository).
- [slide.ng-starter](https://github.com/slide-ng/slide.ng-starter): a starter deck to copy.
- [slide.ng-docs](https://github.com/slide-ng/slide.ng-docs): the documentation site.
- [slide.ng-docker](https://github.com/slide-ng/slide.ng-docker): a container image for building and serving decks.
- [slide.ng-vscode](https://github.com/slide-ng/slide.ng-vscode): a Visual Studio Code extension.

These addresses are placeholders until the repositories are published.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Changes follow the [Code of Conduct](CODE_OF_CONDUCT.md); security problems go through [SECURITY.md](SECURITY.md). Changes are listed in [CHANGELOG.md](CHANGELOG.md).
