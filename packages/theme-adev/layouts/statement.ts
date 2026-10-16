import { Component } from '@angular/core';

@Component({
  selector: 'adev-statement',
  host: { class: 'slidev-layout statement adev-statement' },
  template: '<div class="my-auto"><ng-content /></div>',
})
export class AdevStatement {}
