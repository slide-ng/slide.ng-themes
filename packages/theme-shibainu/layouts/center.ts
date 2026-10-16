import { Component } from '@angular/core';

// Centered text in a 60% wide column, on the tan background.
@Component({
  selector: 'shibainu-center',
  host: { class: 'slidev-layout center grid shibainu-bg-center' },
  template: '<div class="m-auto w-[60%] text-center"><ng-content /></div>',
})
export class ShibainuCenter {}
