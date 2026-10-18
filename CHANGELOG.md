# Changelog

All notable changes are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the packages aim to follow [Semantic Versioning](https://semver.org/) once they are published.

## [Unreleased]

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

[Unreleased]: https://github.com/slide-ng/themes/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/slide-ng/themes/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/slide-ng/themes/commits/main
