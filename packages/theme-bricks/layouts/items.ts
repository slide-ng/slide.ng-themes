import { Component, input, numberAttribute } from '@angular/core';

// A title, then a row of `cols` items (the `::items::` slot, one grid cell per child).
@Component({
  selector: 'bricks-items',
  host: { class: 'slidev-layout items bricks-bg-items' },
  template: `
    <ng-content />
    <div class="bricks-items-grid" [style.grid-template-columns]="'repeat(' + cols() + ', 1fr)'">
      <ng-content select="[items]" />
    </div>
  `,
})
export class BricksItems {
  cols = input(4, { transform: numberAttribute });
}
