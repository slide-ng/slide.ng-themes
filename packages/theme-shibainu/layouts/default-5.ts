import { Component } from '@angular/core';

// Content with 10% empty on the right.
@Component({
  selector: 'shibainu-default-5',
  host: { class: 'slidev-layout default-5 dark shibainu-bg-5' },
  template: '<div class="pr-[10%] py-[2%]"><ng-content /></div>',
})
export class ShibainuDefault5 {}
