import { Component, computed, input } from '@angular/core';

const ICONS: Record<string, string> = {
  note: 'M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1Z',
  tip: 'm12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.4l6-.8Z',
  important: 'M10.5 4h3v10.5h-3Zm0 12.5h3v3.5h-3Z',
  warning: 'M12 3 22 20H2Zm-1 7v5h2v-5Zm0 6.5v2h2v-2Z',
  critical: 'M8.3 3h7.4L21 8.3v7.4L15.7 21H8.3L3 15.7V8.3Zm2.7 5v5h2V8Zm0 6.5v2h2v-2Z',
};

@Component({
  selector: 'adev-callout',
  host: { class: 'adev-callout', '[class]': '"adev-callout-" + type()' },
  template: `
    <svg class="adev-callout-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path [attr.d]="icon()" fill-rule="evenodd" />
    </svg>
    <div class="adev-callout-body">
      @if (title()) {
        <header class="adev-callout-title">{{ title() }}</header>
      }
      <ng-content />
    </div>
  `,
})
export class AdevCallout {
  type = input<'note' | 'tip' | 'important' | 'warning' | 'critical'>('note');
  title = input('');
  icon = computed(() => ICONS[this.type()] ?? ICONS['note']);
}
