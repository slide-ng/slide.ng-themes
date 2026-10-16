import { Component } from '@angular/core';

// A third section style: centered, dark background, a 3em title.
@Component({
  selector: 'shibainu-section-3',
  host: { class: 'slidev-layout section-3 dark grid shibainu-bg-section-3' },
  template: '<div class="my-auto w-full text-center"><ng-content /></div>',
})
export class ShibainuSection3 {}
