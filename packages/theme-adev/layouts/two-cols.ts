import { Component, input } from '@angular/core';

@Component({
  selector: 'adev-two-cols',
  host: {
    class: 'slidev-layout two-columns adev-two-cols w-full h-full grid grid-cols-2',
    '[class]': 'layoutClass()',
  },
  template: `
    <div class="col-left" [class]="contentClass()">
      <ng-content />
      <ng-content select="[left]" />
    </div>
    <div class="col-right" [class]="contentClass()"><ng-content select="[right]" /></div>
  `,
})
export class AdevTwoCols {
  layoutClass = input('');
  contentClass = input('');
}
