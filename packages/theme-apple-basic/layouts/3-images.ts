import { Component, computed, input } from '@angular/core';
import { background } from 'slide-ng/layouts/background';

// Three photos: one tall on the left, two stacked on the right (Keynote "Photo - 3").
@Component({
  selector: 'apple-three-images',
  host: { class: 'grid grid-cols-2 w-full h-full gap-x-7' },
  template: `
    <div class="ml-14 my-14" [style]="left()"></div>
    <div class="grid grid-rows-2 w-full h-full gap-y-7">
      <div class="mr-14 mt-14" [style]="topRight()"></div>
      <div class="mr-14 mb-14" [style]="bottomRight()"></div>
    </div>
  `,
})
export class AppleThreeImages {
  imageLeft = input('');
  imageTopRight = input('');
  imageBottomRight = input('');
  left = computed(() => background(this.imageLeft()));
  topRight = computed(() => background(this.imageTopRight()));
  bottomRight = computed(() => background(this.imageBottomRight()));
}
