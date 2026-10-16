import { Component, input } from '@angular/core';

@Component({
  selector: 'adev-image',
  host: {
    class: 'adev-image',
    '[class.adev-image-small]': 'size() === "small"',
    '[class.adev-image-medium]': 'size() === "medium"',
  },
  template: `
    <img class="adev-image-img" [src]="src()" [alt]="alt()" loading="lazy" decoding="async" />
    @if (caption()) {
      <span class="adev-image-caption">{{ caption() }}</span>
    }
  `,
})
export class AdevImage {
  src = input.required<string>();
  alt = input('');
  caption = input('');
  size = input<'' | 'small' | 'medium'>('');
}
