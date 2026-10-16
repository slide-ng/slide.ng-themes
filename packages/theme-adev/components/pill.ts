import { Component, input } from '@angular/core';

@Component({
  selector: 'adev-pill-row',
  host: { class: 'adev-pill-row' },
  template: '<ng-content />',
})
export class AdevPillRow {}

@Component({
  selector: 'adev-pill',
  host: { class: 'adev-pill', '[attr.title]': 'null' },
  template: `
    @if (href()) {
      <a class="adev-pill-link" [attr.href]="href()">{{ title() }}<ng-content /></a>
    } @else {
      <span class="adev-pill-text">{{ title() }}<ng-content /></span>
    }
  `,
})
export class AdevPill {
  title = input('');
  href = input('');
}
