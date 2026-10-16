import { Component } from '@angular/core';

// A centered quotation with a 4em title.
@Component({
  selector: 'shibainu-quote',
  host: { class: 'slidev-layout quote dark shibainu-bg-quote' },
  template: '<div class="my-auto w-full text-center"><ng-content /></div>',
})
export class ShibainuQuote {}
