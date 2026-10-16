# Theme showcase

One deck per theme, with a slide for every layout the theme provides. Each deck starts with `theme: <name>`, which slide.ng finds in
`node_modules/@slide-ng/theme-<name>` (`npm install` in this repository links the packages there).

```sh
node ../slide.ng/bin/slide-ng.mjs examples/bricks.md          # dev server
node ../slide.ng/bin/slide-ng.mjs build examples/seriph.md    # static site
```

| Deck             | Theme                                        | Slides |
| ---------------- | -------------------------------------------- | ------ |
| `seriph.md`      | [seriph](../packages/theme-seriph)           | 7      |
| `shibainu.md`    | [shibainu](../packages/theme-shibainu)       | 14     |
| `bricks.md`      | [bricks](../packages/theme-bricks)           | 9      |
| `apple-basic.md` | [apple-basic](../packages/theme-apple-basic) | 11     |

The decks load the theme fonts from Google Fonts, so they look right with a network. `npm test` builds and checks all four (`tests/themes.mjs`).
