import { Component } from '@angular/core';

// One short statement, centered on the slide.
@Component({
  selector: 'apple-statement',
  host: { class: 'slidev-layout center h-full grid place-content-center statement' },
  template: '<div class="my-auto"><ng-content /></div>',
})
export class AppleStatement {}
