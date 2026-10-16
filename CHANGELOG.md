# Changelog

All notable changes are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the packages aim to follow [Semantic Versioning](https://semver.org/) once they are published.

## [Unreleased]

## [0.1.0] - unreleased

The first version. Nothing is published yet.

### Added

- `@slide-ng/theme-adev`, a fifth theme inspired by angular.dev (12 layouts, light and dark, with alerts, pills, API labels, kbd keys, a decorative header, prefer and avoid code cards, code groups, snippet cards, tabs, images, video, Mermaid theming, callouts, cards, stats, steps and buttons), with a contrast check in `tests/adev-contrast.mjs`.
- Four theme packages, ports of Slidev themes rebuilt for slide.ng's theme contract: `@slide-ng/theme-seriph` (the `cover` layout and restyled built-in layouts), `@slide-ng/theme-shibainu` (14 layouts), `@slide-ng/theme-bricks` (9 layouts and the `<polygon-1 />` to `<polygon-11 />` components) and `@slide-ng/theme-apple-basic` (10 layouts).
- A showcase deck for every theme in `examples/`, with a slide for each layout.
- Package checks (`tests/packages.test.mjs`) and a browser test of every theme against a slide.ng checkout (`tests/themes.mjs`).
- Repository files for open source hosting: contribution guide, code of conduct, security policy, issue and pull request templates, a commit message check, git hooks and Prettier settings.

[Unreleased]: https://github.com/slide-ng/slide.ng-themes/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/slide-ng/slide.ng-themes/commits/main
