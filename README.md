<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/readme-banner-dark.png">
  <img alt="slide.ng" src="assets/readme-banner-light.png" width="800">
</picture>

# slide.ng themes

Live demos of all five themes: <https://slide-ng.github.io/slide.ng-themes/>

The official themes of [slide.ng](https://github.com/slide-ng/slide.ng), one npm package each. Four are ports of the official
[Slidev themes](https://github.com/slidevjs/themes), rebuilt for slide.ng's theme contract (layouts, components and CSS as Angular code); `adev` is new and inspired by [angular.dev](https://angular.dev).

| Theme         | Package                                                     | Original                                             | Layouts                                       |
| ------------- | ----------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| `seriph`      | [`@slide-ng/theme-seriph`](packages/theme-seriph)           | [Anthony Fu](https://github.com/antfu)               | `cover` (plus the built-in layouts, restyled) |
| `shibainu`    | [`@slide-ng/theme-shibainu`](packages/theme-shibainu)       | [iiiiiiinès](https://github.com/iiiiiiines)          | 14                                            |
| `bricks`      | [`@slide-ng/theme-bricks`](packages/theme-bricks)           | [iiiiiiinès](https://github.com/iiiiiiines)          | 9, and `<polygon-1 />` to `<polygon-11 />`    |
| `apple-basic` | [`@slide-ng/theme-apple-basic`](packages/theme-apple-basic) | [Jeremy Meissner](https://github.com/JeremyMeissner) | 10                                            |
| `adev`        | [`@slide-ng/theme-adev`](packages/theme-adev)               | Inspired by [angular.dev](https://angular.dev)       | 12, and 19 components (`<adev-alert>`)        |

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
If none is installed, the build stops and prints the install command.

Detail on each theme is in the documentation at [slide-ng.dev](https://slide-ng.dev). `examples/<name>.md` shows every layout of each theme.

## Develop

```sh
npm install                 # links the packages into node_modules/@slide-ng
npm test                    # package checks, then a browser test of every theme
npm run format:check
```

The tests need a checkout of slide.ng with its dependencies installed (`SLIDE_NG_DIR`, default `../slide.ng`) and a Chromium (`CHROME_PATH`).

## Maintainers

<!-- prettier-ignore-start -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/erkamyaman"><img src="https://avatars.githubusercontent.com/u/88717125?v=4&s=100" width="100px;" alt="Erkam Yaman"/><br /><sub><b>Erkam Yaman</b></sub></a><br /><sub>Maintainer</sub></td>
    </tr>
  </tbody>
</table>
<!-- prettier-ignore-end -->

## Contributors

Thanks to everyone who has helped. This project follows the [all-contributors](https://allcontributors.org) specification. Contributions of any kind welcome!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/erkamyaman"><img src="https://avatars.githubusercontent.com/u/88717125?v=4?s=100" width="100px;" alt="Erkam Yaman"/><br /><sub><b>Erkam Yaman</b></sub></a><br /><a href="https://github.com/slide-ng/slide.ng-themes/commits?author=erkamyaman" title="Code">💻</a> <a href="https://github.com/slide-ng/slide.ng-themes/commits?author=erkamyaman" title="Documentation">📖</a> <a href="#maintenance-erkamyaman" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Sponsors

The slide.ng themes is free and open source. If it helps your work, please consider sponsoring it. Your support keeps development going.

<p>
  <a href="https://github.com/sponsors/erkamyaman"><img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-db61a2?logo=githubsponsors&logoColor=white" alt="Sponsor on GitHub" /></a>
</p>

## Credits and licence

Layout names, slots, CSS values and font settings follow the Slidev themes, which are MIT licensed (Copyright (c) 2021 Slidev.js Team).
The designs are by Anthony Fu (seriph), iiiiiiinès (shibainu, bricks) and Jeremy Meissner (apple-basic). The Angular code is new. `adev` is inspired by angular.dev (Angular, MIT, Google LLC) and is not an official Angular theme; slide.ng is not affiliated with or endorsed by Google or the Angular team.
The images of the originals are CC BY-NC-SA 4.0 and are not copied here; the ports draw CSS gradients instead (see [NOTICE](NOTICE)).

This repository is MIT licensed, see [LICENSE](LICENSE).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Changes follow the [Code of Conduct](CODE_OF_CONDUCT.md); security problems go through [SECURITY.md](SECURITY.md). Changes are listed in [CHANGELOG.md](CHANGELOG.md).

## Disclaimer

slide.ng is an independent open-source project. It is not affiliated with or endorsed by the Angular team or Google, or by Slidev. Angular is a trademark of Google LLC; Slidev is a project of its own maintainers. The names are used only to describe what the themes are based on. This is a plain notice, not legal advice.

The demo decks have a small theme switcher in the top left corner to jump to the other themes at the same slide. It lives in `examples/layers` and `examples/components`, is for the demos only and is not part of the theme packages.
