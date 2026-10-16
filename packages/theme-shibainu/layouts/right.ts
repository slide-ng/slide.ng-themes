import { Component } from '@angular/core';

// Right-aligned content in the right 70%.
@Component({
  selector: 'shibainu-right',
  host: { class: 'slidev-layout right default-4 shibainu-bg-4' },
  template: '<div class="pl-[30%] text-right p-5"><ng-content /></div>',
})
export class ShibainuRight {}
