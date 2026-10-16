import { Component } from '@angular/core';

// Content with wide margins (15%) on both sides.
@Component({
  selector: 'shibainu-default-6',
  host: { class: 'slidev-layout default-6 dark shibainu-bg-6' },
  template: '<div class="px-[15%] py-[5%]"><ng-content /></div>',
})
export class ShibainuDefault6 {}
