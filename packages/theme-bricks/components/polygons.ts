import { Component } from '@angular/core';

// The eleven coloured shapes of the theme, used as <polygon-1 /> ... <polygon-11 />.
// Each has its natural size (--w, --h); give it a class to change that: <polygon-7 class="w-20 h-20 m-auto" />.
// The component names and the colour palette follow the original theme; the shapes themselves are drawn for
// slide.ng from plain geometry (arcs, lines) and share no path data with the original artwork.

@Component({
  selector: 'polygon-1',
  host: { class: 'bricks-polygon', style: '--w:260px;--h:130px' },
  template:
    '<svg viewBox="0 0 260 130" fill="none"><path d="M0 130A130 130 0 0 1 260 130Z" fill="#F9D56E" /></svg>',
})
export class Polygon1 {}

@Component({
  selector: 'polygon-2',
  host: { class: 'bricks-polygon', style: '--w:200px;--h:200px' },
  template:
    '<svg viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="100" fill="#F07A6B" /></svg>',
})
export class Polygon2 {}

@Component({
  selector: 'polygon-3',
  host: { class: 'bricks-polygon', style: '--w:269px;--h:178px' },
  template:
    '<svg viewBox="0 0 269 178" fill="none"><path d="M0 0L269 178H0Z" fill="#72A6E2" /></svg>',
})
export class Polygon3 {}

@Component({
  selector: 'polygon-4',
  host: { class: 'bricks-polygon', style: '--w:180px;--h:227px' },
  template:
    '<svg viewBox="0 0 180 227" fill="none"><path d="M0 227V90A90 90 0 0 1 180 90V227Z" fill="#F9D56E" /></svg>',
})
export class Polygon4 {}

@Component({
  selector: 'polygon-5',
  host: { class: 'bricks-polygon', style: '--w:238px;--h:256px' },
  template:
    '<svg viewBox="0 0 238 256" fill="none"><path d="M119 24L214 232H24Z" fill="#F07A6B" stroke="#F07A6B" stroke-width="12" stroke-linejoin="round" /></svg>',
})
export class Polygon5 {}

@Component({
  selector: 'polygon-6',
  host: { class: 'bricks-polygon', style: '--w:300px;--h:202px' },
  template:
    '<svg viewBox="0 0 300 202" fill="none"><path d="M0 202A150 150 0 0 1 300 202H236A86 86 0 0 0 64 202Z" fill="#F07A6B" /></svg>',
})
export class Polygon6 {}

@Component({
  selector: 'polygon-7',
  host: { class: 'bricks-polygon', style: '--w:247px;--h:137px' },
  template:
    '<svg viewBox="0 0 247 137" fill="none"><path d="M0 0H247V137H190A66 66 0 0 0 57 137H0Z" fill="#F9D56E" /></svg>',
})
export class Polygon7 {}

@Component({
  selector: 'polygon-8',
  host: { class: 'bricks-polygon', style: '--w:159px;--h:206px' },
  template:
    '<svg viewBox="0 0 159 206" fill="none"><path d="M0 0H159V206H112V120A32 32 0 0 0 48 120V206H0Z" fill="#E29B94" /></svg>',
})
export class Polygon8 {}

@Component({
  selector: 'polygon-9',
  host: { class: 'bricks-polygon', style: '--w:150px;--h:212px' },
  template:
    '<svg viewBox="0 0 150 212" fill="none"><path d="M0 212V30L150 90V212Z" fill="#72A6E2" /></svg>',
})
export class Polygon9 {}

@Component({
  selector: 'polygon-10',
  host: { class: 'bricks-polygon', style: '--w:229px;--h:214px' },
  template:
    '<svg viewBox="0 0 229 214" fill="none"><path d="M0 0H70V70H140V140H229V214H0Z" fill="#E29B94" /></svg>',
})
export class Polygon10 {}

@Component({
  selector: 'polygon-11',
  host: { class: 'bricks-polygon', style: '--w:203px;--h:159px' },
  template:
    '<svg viewBox="0 0 203 159" fill="none"><path d="M60 0H175L203 159H0Z" fill="#72A6E2" /></svg>',
})
export class Polygon11 {}
