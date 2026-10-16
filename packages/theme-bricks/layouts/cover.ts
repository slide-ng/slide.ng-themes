import { Component } from '@angular/core';

// Title slide in the serif font, with coloured shapes around the edges.
@Component({
  selector: 'bricks-cover',
  host: { class: 'slidev-layout cover bricks-bg-cover' },
  template: '<div class="my-auto w-full"><ng-content /></div>',
})
export class BricksCover {}
