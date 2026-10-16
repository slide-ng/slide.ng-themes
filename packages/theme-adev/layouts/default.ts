import { Component } from '@angular/core';

@Component({
  selector: 'adev-default',
  host: { class: 'slidev-layout default adev-default' },
  template: '<ng-content />',
})
export class AdevDefault {}
