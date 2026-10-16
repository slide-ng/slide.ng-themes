import { Component } from '@angular/core';

@Component({
  selector: 'adev-intro',
  host: { class: 'slidev-layout intro adev-intro' },
  template: '<div class="my-auto"><ng-content /></div>',
})
export class AdevIntro {}
