import { Component } from '@angular/core';

@Component({
  selector: 'adev-quote',
  host: { class: 'slidev-layout quote adev-quote' },
  template: '<div class="adev-quote-card my-auto"><ng-content /></div>',
})
export class AdevQuote {}
