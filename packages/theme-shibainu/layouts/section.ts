import { Component } from '@angular/core';

// Section title, vertically centered, light text on brown.
@Component({
  selector: 'shibainu-section',
  host: { class: 'slidev-layout section section-1 grid shibainu-bg-section' },
  template: '<div class="my-auto w-full px-10 pt-15"><ng-content /></div>',
})
export class ShibainuSection {}
