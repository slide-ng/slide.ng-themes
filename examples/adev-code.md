---
theme: adev
title: adev code
layout: default
---

# Prefer and avoid

```ts {prefer} [counter.ts]
const count = signal(0);
count.update((n) => n + 1);
```

```ts {avoid} [counter.ts]
let count = 0;
count = count + 1;
```

---
layout: default
---

# Prefer and avoid, as components

<adev-prefer>

Keep state in a signal and derive the rest with `computed()`.

</adev-prefer>

<adev-avoid title="legacy.ts">

```ts
this.total = this.price * this.quantity;
```

</adev-avoid>

---
layout: default
---

# Line numbers and highlights

```ts [user.ts] {2,4-5} {lines:true}
import { Component, input } from '@angular/core';
@Component({
  selector: 'app-user',
  template: `<h2>Hello</h2>`,
})
export class User {
  name = input.required<string>();
}
```

---
layout: default
---

# Diff lines

```ts [user.ts] {lines:true}
export class User {
  name = input<string>(); // [!code --]
  name = input.required<string>(); // [!code ++]
  greeting = computed(() => `Hello, ${this.name()}`);
}
```

---
layout: default
---

# Files in tabs

::code-group

```ts [app.ts]
@Component({ selector: 'app-root', templateUrl: './app.html' })
export class App {}
```

```html [app.html]
<h1>Hello</h1>
<app-user name="Ada" />
```

```css [app.css]
h1 {
  color: hotpink;
}
```

::

---
layout: default
---

# Code from a file

<<< ./snippets/user.component.ts#greeting ts

---
layout: default
---

# The code card

<adev-code-card title="app.ts" label="TypeScript">

```ts
export const answer = 42;
```

</adev-code-card>
