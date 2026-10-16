import { Component } from '@angular/core';

// Section title, vertically centered.
@Component({
  selector: 'apple-section',
  host: { class: 'slidev-layout h-full grid section' },
  template: '<div class="my-auto"><ng-content /></div>',
})
export class AppleSection {}
