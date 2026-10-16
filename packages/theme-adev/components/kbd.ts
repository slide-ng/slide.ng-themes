import { Component } from '@angular/core';

@Component({
  selector: 'adev-kbd',
  host: { class: 'adev-kbd' },
  template: '<ng-content />',
})
export class AdevKbd {}
