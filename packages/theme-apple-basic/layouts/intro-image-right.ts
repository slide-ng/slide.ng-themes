import { Component, computed, input } from '@angular/core';
import { background } from 'slide-ng/layouts/background';

// Title on the left (vertically centered), photo on the right. The frontmatter `class` goes on the text side.
@Component({
  selector: 'apple-intro-image-right',
  host: { class: 'grid grid-cols-2 w-full h-full' },
  template: `
    <div class="slidev-layout default image-right my-auto" [class]="contentClass()">
      <ng-content />
    </div>
    <div class="apple-photo" [style]="style()"></div>
  `,
})
export class AppleIntroImageRight {
  image = input('');
  contentClass = input('');
  style = computed(() => background(this.image()));
}
