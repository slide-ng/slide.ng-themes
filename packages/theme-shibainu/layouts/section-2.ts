import { Component } from '@angular/core';

// A second section style: dark text on a tan background.
@Component({
  selector: 'shibainu-section-2',
  host: { class: 'slidev-layout section section-2 grid shibainu-bg-section-2' },
  template: '<div class="my-auto px-10 w-full"><ng-content /></div>',
})
export class ShibainuSection2 {}
