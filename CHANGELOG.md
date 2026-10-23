# Changelog

All notable changes are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the packages aim to follow [Semantic Versioning](https://semver.org/) once they are published.

## [Unreleased]

## [1.1.0] - Unreleased

Ready for `@slide-ng/core` 2.0. The five themes are tested with 2.0.0 and still work with 1.x.

### Added

- `@slide-ng/theme-seriph` reads `themeConfig.primary` (`#5d8392` by default, in `theme.json`), as the original does: with slide.ng 2.0 a deck changes the accent with `themeConfig: { primary: ... }`.
- `@slide-ng/theme-bricks` and `@slide-ng/theme-apple-basic` have their own accent colour (`--slidev-theme-primary`) for slide.ng's progress bar, click preview and menus: a deep blue in bricks (`#3a6fb0`), Apple's link blue in apple-basic (`#0066cc`, `#2997ff` in dark mode). They used slide.ng's default cyan, 2.3:1 on white.
- `@slide-ng/theme-bricks`: the original's `<polygon-7 w="20" h="20" m="auto" />` sizes the shape with slide.ng 2.0 (attributify); the README says so.
- CONTRIBUTING.md says what slide.ng 2.0 adds for a theme: `themeConfig`, the new parts that take the primary colour, `locales/`, custom transitions, right to left and attributify.

### Changed

- The packages ask for `@slide-ng/core` `^1.0.0 || ^2.0.0` instead of any version.
- `@slide-ng/theme-shibainu`'s accent (`--slidev-theme-primary`) is the light grey `#ebeef2` instead of the dark brown: slide.ng 2.0 draws the progress bar, the presenter's next click and the sync menu in it, and the brown disappeared on the brown slides and in the dark bar. The text colour of the light slides stays the dark brown.
- `@slide-ng/theme-adev`'s accent is the lighter violet `#9d5cff` instead of `#8514f5`, readable in the dark dock and menus (4.8:1) and on a light slide (3.9:1).
- The subtitle under a heading (`h1 + p`) is 0.65 opaque instead of 0.5 in `seriph`, `bricks` and `apple-basic` (5.5:1 on white instead of 3.4:1), and so is the small uppercase `h3` of `bricks` and `apple-basic` (it was 0.4, 2.5:1). In `shibainu` both keep the full text colour: dimmed, they fell to about 2:1 on the brown and tan backgrounds.
- The text of the `intro-image` slide in `examples/apple-basic.md` is white, so it reads on the blue that stands in for the photo.

### Fixed

- Right to left (`lang: ar`, `he`, `fa`, `ur` in slide.ng 2.0): the list markers, alert and quote rails, section bar, two-column divider, steps, table headers and scheme button of `@slide-ng/theme-adev`, the small `h3` and quote offsets of the other themes, and the photo margins of `apple-basic`'s `image-right`, `intro-image-right` and `3-images` use logical properties and mirror with the page.

## [1.0.0] - 2026-10-18

The first stable release. The five themes are versioned together and are tested with `@slide-ng/core` 1.0.

### Changed

- The repository is now `slide-ng/themes` (it was `slide-ng/slide.ng-themes`); links point to the new name.
- `@slide-ng/theme-adev` sets `colorSchema: dark` again, so the dock has no sun or moon toggle: the theme's own button on the slides is the only dark and light switch, and it recolours the slides only.
- The READMEs of `@slide-ng/theme-shibainu` and `@slide-ng/theme-bricks` say that a deck using them keeps their mode (dark and light).

## [0.1.1] - 2026-10-17

### Added

- `@slide-ng/theme-adev`, a fifth theme inspired by angular.dev (12 layouts, light and dark, with alerts (ten kinds), pills, API labels, kbd keys, a decorative header, prefer and avoid code cards, code groups, snippet cards, tabs, images, video, Mermaid theming, cards, stats, steps and buttons), with a contrast check in `tests/adev-contrast.mjs`.

### Fixed

- The repository, homepage and bugs links of all five packages point to `slide-ng/slide.ng-themes`, so npm provenance accepts the publish and the packages link to the right repository.
- The release workflow publishes each package only when its version is not on the registry yet.

## [0.1.0] - 2026-10-16

The first version of the four ported themes.

### Added

- Four theme packages, ports of Slidev themes rebuilt for slide.ng's theme contract: `@slide-ng/theme-seriph` (the `cover` layout and restyled built-in layouts), `@slide-ng/theme-shibainu` (14 layouts), `@slide-ng/theme-bricks` (9 layouts and the `<polygon-1 />` to `<polygon-11 />` components) and `@slide-ng/theme-apple-basic` (10 layouts).
- A showcase deck for every theme in `examples/`, with a slide for each layout.
- Package checks (`tests/packages.test.mjs`) and a browser test of every theme against a slide.ng checkout (`tests/themes.mjs`).
- Repository files for open source hosting: contribution guide, code of conduct, security policy, issue and pull request templates, a commit message check, git hooks and Prettier settings.

[Unreleased]: https://github.com/slide-ng/themes/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/slide-ng/themes/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/slide-ng/themes/compare/v0.1.1...v1.0.0
[0.1.1]: https://github.com/slide-ng/themes/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/slide-ng/themes/commits/main
