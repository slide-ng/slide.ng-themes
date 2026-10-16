import { Component } from '@angular/core';

// One short statement, centered.
@Component({
  selector: 'bricks-statement',
  host: { class: 'slidev-layout statement bricks-bg-statement' },
  template: '<div class="my-auto"><ng-content /></div>',
})
export class BricksStatement {}
