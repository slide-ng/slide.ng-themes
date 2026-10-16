import { Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'adev-card',
  host: { class: 'adev-card', '[class.adev-card-hot]': 'hot()' },
  template: `
    @if (label()) {
      <span class="adev-card-label">{{ label() }}</span>
    }
    @if (title()) {
      <h3 class="adev-card-title">{{ title() }}</h3>
    }
    <div class="adev-card-body"><ng-content /></div>
  `,
})
export class AdevCard {
  label = input('');
  title = input('');
  hot = input(false, { transform: booleanAttribute });
}
