import { Component } from '@angular/core';

// A centered quotation.
@Component({
  selector: 'bricks-quote',
  host: { class: 'slidev-layout quote bricks-bg-quote' },
  template: '<div class="my-auto"><ng-content /></div>',
})
export class BricksQuote {}
