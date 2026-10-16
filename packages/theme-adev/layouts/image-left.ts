import { Component, computed, input } from '@angular/core';
import { background } from 'slide-ng/layouts/background';

@Component({
  selector: 'adev-image-left',
  host: { class: 'grid grid-cols-2 w-full h-full auto-rows-fr' },
  template: `
    <div class="adev-photo w-full h-full" [class.adev-hero]="!image()" [style]="style()"></div>
    <div class="slidev-layout default adev-default" [class]="contentClass()"><ng-content /></div>
  `,
})
export class AdevImageLeft {
  image = input('');
  contentClass = input('');
  backgroundSize = input('cover');
  style = computed(() => background(this.image(), false, this.backgroundSize()));
}
