import { Component, ElementRef, inject, input, signal } from '@angular/core';
import { COPIED_ICON, COPY_ICON, copyCode } from './code-copy';

@Component({
  selector: 'adev-code-card',
  host: { class: 'adev-code-card' },
  template: `
    <header class="adev-code-card-header">
      <span class="adev-code-card-title">{{ title() }}</span>
      @if (label()) {
        <span class="adev-code-card-label">{{ label() }}</span>
      }
      <button
        type="button"
        class="adev-copy"
        [attr.aria-label]="copied() ? 'Copied' : 'Copy code'"
        (click)="copy()"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path [attr.d]="copied() ? copiedIcon : copyIcon" />
        </svg>
      </button>
    </header>
    <div class="adev-code-card-body"><ng-content /></div>
  `,
})
export class AdevCodeCard {
  title = input('');
  label = input('');
  copied = signal(false);
  copyIcon = COPY_ICON;
  copiedIcon = COPIED_ICON;
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  async copy() {
    if (!(await copyCode(this.host))) return;
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
