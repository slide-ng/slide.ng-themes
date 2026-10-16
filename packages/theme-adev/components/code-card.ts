import { Component, input } from '@angular/core';

@Component({
  selector: 'adev-code-card',
  host: { class: 'adev-code-card' },
  template: `
    <header class="adev-code-card-header">
      <span>{{ title() }}</span>
      @if (label()) {
        <span class="adev-code-card-label">{{ label() }}</span>
      }
    </header>
    <div class="adev-code-card-body"><ng-content /></div>
  `,
})
export class AdevCodeCard {
  title = input('');
  label = input('');
}
