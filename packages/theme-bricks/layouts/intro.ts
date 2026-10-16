import { Component } from '@angular/core';

// Two columns (3:4): the `::left::` slot, and the title centered in the right one.
@Component({
  selector: 'bricks-intro',
  host: { class: 'slidev-layout intro bricks-bg-intro' },
  template: `
    <div><ng-content select="[left]" /></div>
    <div class="h-full grid">
      <div class="my-auto"><ng-content /></div>
    </div>
  `,
})
export class BricksIntro {}
