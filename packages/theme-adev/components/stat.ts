import { Component, input } from '@angular/core';

@Component({
  selector: 'adev-stat',
  host: { class: 'adev-stat' },
  template: `
    <div class="adev-stat-value">{{ value() }}<ng-content select="[value]" /></div>
    @if (label()) {
      <div class="adev-stat-label">{{ label() }}</div>
    }
  `,
})
export class AdevStat {
  value = input('');
  label = input('');
}
