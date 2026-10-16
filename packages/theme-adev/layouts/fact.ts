import { Component } from '@angular/core';

@Component({
  selector: 'adev-fact',
  host: { class: 'slidev-layout fact adev-fact' },
  template: '<div class="my-auto"><ng-content /></div>',
})
export class AdevFact {}
