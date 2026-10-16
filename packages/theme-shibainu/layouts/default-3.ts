import { Component, input } from '@angular/core';

// Wide content with side margins. The frontmatter `class` goes on the content box (theme.json: classProp).
@Component({
  selector: 'shibainu-default-3',
  host: { class: 'slidev-layout default-3 dark shibainu-bg-3' },
  template: '<div class="px-[8%] py-[2%]" [class]="contentClass()"><ng-content /></div>',
})
export class ShibainuDefault3 {
  contentClass = input('');
}
