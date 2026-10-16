---
theme: adev
title: adev alerts, pills and small elements
layout: default
---

# Alerts, nine kinds

<div class="grid grid-cols-3 gap-x-5">
<adev-alert kind="note">Notes use the blue rail.</adev-alert>
<adev-alert kind="tip">Tips use the green and cyan rail.</adev-alert>
<adev-alert kind="todo">A to do, in gray.</adev-alert>
<adev-alert kind="question">Questions are blue to cyan.</adev-alert>
<adev-alert kind="summary">Summaries are violet.</adev-alert>
<adev-alert kind="tldr">Too long, did not read, in pink.</adev-alert>
<adev-alert kind="critical">Critical is pink to orange red.</adev-alert>
<adev-alert kind="important">Important is red to pink.</adev-alert>
<adev-alert kind="helpful" title="Handy">Helpful, with a title of your own.</adev-alert>
</div>

---
layout: default
---

# Alerts as paragraphs

NOTE: A paragraph that starts with the kind, a colon and a space becomes an alert, with **markdown** and `code` inside.

TIP: Works for all nine kinds. A paragraph ends at the blank line,
so it may take several lines.

CRITICAL: Braces are safe: `{{ value() }}` and a plain &#123;brace&#125;.

<adev-alert kind="todo" bare>The tag form also takes `bare`, which drops the label.</adev-alert>

---
layout: default
---

# Pills

<adev-pill-row>
<adev-pill title="Signals"></adev-pill>
<adev-pill title="Standalone"></adev-pill>
<adev-pill title="Zoneless"></adev-pill>
<adev-pill title="SSR"></adev-pill>
<adev-pill title="Hydration"></adev-pill>
<adev-pill title="Control flow"></adev-pill>
<adev-pill title="Defer"></adev-pill>
</adev-pill-row>

Links, internal and external:

<adev-pill-row>
<adev-pill href="/guide" title="Guide"></adev-pill>
<adev-pill href="https://angular.dev" title="angular.dev"></adev-pill>
<adev-pill href="https://github.com/angular/angular" title="Source"></adev-pill>
</adev-pill-row>

---
layout: default
---

# API item labels

<div class="flex flex-wrap items-center gap-3">
<adev-api-label kind="class"></adev-api-label>
<adev-api-label kind="const"></adev-api-label>
<adev-api-label kind="decorator"></adev-api-label>
<adev-api-label kind="directive"></adev-api-label>
<adev-api-label kind="element"></adev-api-label>
<adev-api-label kind="enum"></adev-api-label>
<adev-api-label kind="function"></adev-api-label>
<adev-api-label kind="interface"></adev-api-label>
<adev-api-label kind="pipe"></adev-api-label>
<adev-api-label kind="ng-module"></adev-api-label>
<adev-api-label kind="type-alias"></adev-api-label>
<adev-api-label kind="block"></adev-api-label>
</div>

<div class="flex flex-wrap items-center gap-3 mt-6">
<adev-api-label kind="class" full></adev-api-label>
<adev-api-label kind="function" full></adev-api-label>
<adev-api-label kind="deprecated" full version="v20"></adev-api-label>
<adev-api-label kind="developer-preview" full version="v19"></adev-api-label>
<adev-api-label kind="experimental" full></adev-api-label>
<adev-api-label kind="stable" full></adev-api-label>
</div>

---
layout: default
---

# Keyboard keys

Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to search, <kbd>Esc</kbd> to close.

With the component: <adev-kbd>Shift</adev-kbd> + <adev-kbd>Enter</adev-kbd>

---
layout: default
---

# Tables and links

| Input     | Type      | Default |
| --------- | --------- | ------- |
| `title`   | `string`  | `''`    |
| `href`    | `string`  | `''`    |
| `bare` | `boolean` | `'a'`   |

Read [the guide](https://angular.dev/guide) or the [overview](/overview).

---
layout: default
---

# Headings

## Heading two

### Heading three

#### Heading four

##### Heading five

###### Heading six

Body text under the headings.

<hr/>

A rule above this line.

---
layout: default
---

# Decorative header

<adev-decorative-header title="What is Angular?" imgSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cdefs%3E%3ClinearGradient id='g'%3E%3Cstop offset='0' stop-color='%23e90464'/%3E%3Cstop offset='1' stop-color='%238514f5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='60' rx='30' fill='url(%23g)'/%3E%3C/svg%3E">A platform for building web applications.</adev-decorative-header>

<adev-decorative-header title="On the hero gradient" gradient>Same header with the brand panel.</adev-decorative-header>
