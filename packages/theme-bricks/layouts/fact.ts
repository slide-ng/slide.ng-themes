import { Component } from '@angular/core';

// A big fact, centered.
@Component({
  selector: 'bricks-fact',
  host: { class: 'slidev-layout fact bricks-bg-fact' },
  template: '<div class="my-auto"><ng-content /></div>',
})
export class BricksFact {}
