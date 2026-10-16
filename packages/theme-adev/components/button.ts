import { Component, input } from '@angular/core';

@Component({
  selector: 'adev-button',
  host: { class: 'adev-button', '[class]': '"adev-button-" + variant()' },
  template: '<ng-content />',
})
export class AdevButton {
  variant = input<'primary' | 'secondary'>('primary');
}
