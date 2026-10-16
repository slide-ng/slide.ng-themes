import { Component, computed, input } from '@angular/core';
import { background } from 'slide-ng/layouts/background';

@Component({
  selector: 'adev-cover',
  host: {
    class: 'slidev-layout cover adev-cover',
    '[class.adev-hero]': '!background()',
    '[style]': 'style()',
  },
  template: '<div class="my-auto w-full"><ng-content /></div>',
})
export class AdevCover {
  background = input('');
  style = computed(() => background(this.background(), true));
}
