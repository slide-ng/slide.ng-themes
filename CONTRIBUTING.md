# Contributing to slide.ng-themes

Thanks for helping. The rules of a theme are in slide.ng's `docs/THEMES.md` and `docs/WRITING-A-THEME.md`.

By taking part you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). Report security problems privately, as [SECURITY.md](SECURITY.md) describes. By contributing you agree that your work is licensed under the [MIT license](LICENSE) of this project.

## Set up

You need Node.js 22.23.3 or newer (`.nvmrc` names the version CI uses). The browser test also needs a checkout of slide.ng with its dependencies installed, and a Chromium (`CHROME_PATH`).

```sh
git clone https://github.com/slide-ng/slide.ng-themes.git
cd slide.ng-themes
npm install          # links the packages into node_modules/@slide-ng
SLIDE_NG_DIR=../slide.ng npm test
```

`npm install` also sets `core.hooksPath` to `.githooks` and `commit.template` to `.gitmessage`, unless you already set them. The hooks are small:

- `pre-commit` formats the staged files with Prettier. It skips a file that also has unstaged changes.
- `commit-msg` warns when the message does not follow the commit message rules below. It never blocks the commit.

## Commands

| command                        | what it does                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `npm test`                     | package checks, the commit message check, then a browser test of every theme |
| `npm run format`               | Prettier, writes changes (`npm run format:check` only checks)                |
| `node tests/themes.mjs bricks` | the browser test of one theme                                                |

`npm test` runs `tests/packages.test.mjs` (the fields every package needs, one showcase slide per layout), `tests/commit-message.test.mjs`, and `tests/themes.mjs`. The last one builds each deck in `examples/` with slide.ng's command line and opens every slide in Chromium, so it needs `SLIDE_NG_DIR` and a browser. Before a pull request, run the format check and `npm test`.

## Code style

Small files, plain comments, few dependencies. Prettier decides the formatting (`.prettierrc`, `.editorconfig`); the showcase decks in `examples/` are left alone because their `---` slide separators are test input.

## Commit messages

`type(scope): summary`, imperative, lower case, no period, 72 characters at most, no trailer lines. An optional body, after a blank line, says why.

- Types: `feat`, `fix`, `perf`, `refactor`, `test`, `docs`, `style`, `build`, `ci`, `chore`, `revert`.
- Scopes: `seriph`, `shibainu`, `bricks`, `apple-basic`, `adev`, `packages`, `examples`, `tests`, `docs`, `deps`, `ci`. Leave the scope out when a change spans several parts.

Pull requests are squash merged, so the pull request title must follow the same form. You can check a message yourself:

```sh
node scripts/commit-message.mjs --title "fix(bricks): keep the polygon colors"
node scripts/commit-message.mjs --range origin/main..HEAD
```

## Add a theme

1. Make `packages/theme-<name>/` with `theme.json`, `layouts/`, `styles/index.css` and, if needed, `components/`.
2. Copy the `package.json` of an existing package: name `@slide-ng/theme-<name>`, `slide-ng` as a peer dependency,
   `files`, and the keywords `slide-ng-theme` and `slide-ng`.
3. Write a `README.md` for the package: what it looks like, what is ported, what is different, and the credit to the original author.
4. Add `examples/<name>.md`, a deck with `theme: <name>` and one slide for every layout (`layout: <layout>`).
5. Add the theme to the table in the root README and to `tests/themes.mjs` (the layout tags, a computed style or two, the fonts). Add its name to the list in `tests/packages.test.mjs`.
6. Run `npm run format` and `npm test`.

To add a layout to an existing theme, write `layouts/<layout>.ts` (copy a small one), add a slide for it to the theme's deck in `examples/`, and extend the checks in `tests/themes.mjs`.

## Rules

- Original code under MIT can be ported, with credit in the package README and in `NOTICE`.
- Do not copy images, fonts or other assets that are not MIT or compatible (for example CC BY-NC-SA). Draw it in CSS or leave it out.
- Keep files small and comments short and plain.
- One change per pull request, with a test where it makes sense. Fill in the pull request template.
- Open an issue first for a new theme or a large change, so we can agree on the approach.

## Recognising contributions

Everyone who helps is listed in the Contributors section of the README, whatever the kind of help: code, docs, design, review or triage. To add someone, comment `@all-contributors please add @user for code` on an issue or pull request (use another type such as `doc`, `review` or `bug` when it fits). The bot opens a pull request that updates `.all-contributorsrc` and the README.
