import { Component } from '@angular/core';

@Component({
  selector: 'adev-section',
  host: { class: 'slidev-layout section adev-section w-full h-full grid' },
  template: '<div class="adev-section-body my-auto"><ng-content /></div>',
})
export class AdevSection {}
