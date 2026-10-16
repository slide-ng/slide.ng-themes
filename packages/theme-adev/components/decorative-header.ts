import { Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'adev-decorative-header',
  host: {
    class: 'adev-decorative-header',
    '[class.adev-decorative-header-gradient]': 'gradient()',
    '[attr.title]': 'null',
  },
  template: `
    <div class="adev-decorative-header-content">
      <div class="adev-decorative-header-title">{{ title() }}</div>
      <ng-content />
    </div>
    @if (imgSrc()) {
      <img class="adev-decorative-header-img" [attr.src]="imgSrc()" [attr.alt]="imgAlt()" />
    }
  `,
})
export class AdevDecorativeHeader {
  title = input('');
  imgSrc = input('');
  imgAlt = input('');
  gradient = input(false, { transform: booleanAttribute });
}
