import { Component } from '@angular/core';

// Content in the left part: 25% empty on the right.
@Component({
  selector: 'shibainu-default-7',
  host: { class: 'slidev-layout default-7 dark shibainu-bg-7' },
  template: '<div class="pr-[25%] py-[2%]"><ng-content /></div>',
})
export class ShibainuDefault7 {}
