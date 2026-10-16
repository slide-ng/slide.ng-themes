import { Component } from '@angular/core';

// Content pushed to the right: 20% empty on the left.
@Component({
  selector: 'shibainu-default-4',
  host: { class: 'slidev-layout default-4 dark shibainu-bg-4' },
  template: '<div class="pl-[20%] py-[2%]"><ng-content /></div>',
})
export class ShibainuDefault4 {}
