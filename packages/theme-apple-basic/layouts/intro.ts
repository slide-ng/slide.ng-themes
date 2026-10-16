import { Component } from '@angular/core';

// Title slide (Keynote "Title"): big bold title, vertically centered.
@Component({
  selector: 'apple-intro',
  host: { class: 'slidev-layout intro' },
  template: '<div class="my-auto"><ng-content /></div>',
})
export class AppleIntro {}
