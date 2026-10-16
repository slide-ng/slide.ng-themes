import { Component, Directive, ElementRef, inject, input, signal } from '@angular/core';
import { COPIED_ICON, COPY_ICON, copyCode } from './code-copy';

const CHECK = 'M9.55 18 3.85 12.3l1.43-1.43 4.27 4.27 9.17-9.17 1.43 1.43Z';
const CLOSE =
  'M6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4Z';

const TEMPLATE = `
  <header class="adev-verdict-header">
    <span class="adev-verdict-chip">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path [attr.d]="icon" /></svg>
      {{ label() || defaultLabel }}
    </span>
    @if (title()) {
      <span class="adev-verdict-title">{{ title() }}</span>
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
  <div class="adev-verdict-body"><ng-content /></div>
`;

@Directive()
export abstract class AdevVerdict {
  title = input('');
  label = input('');
  copied = signal(false);
  copyIcon = COPY_ICON;
  copiedIcon = COPIED_ICON;
  abstract icon: string;
  abstract defaultLabel: string;
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  async copy() {
    if (!(await copyCode(this.host))) return;
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}

@Component({
  selector: 'adev-prefer',
  host: { class: 'adev-verdict adev-prefer' },
  template: TEMPLATE,
})
export class AdevPrefer extends AdevVerdict {
  icon = CHECK;
  defaultLabel = 'Prefer';
}

@Component({
  selector: 'adev-avoid',
  host: { class: 'adev-verdict adev-avoid' },
  template: TEMPLATE,
})
export class AdevAvoid extends AdevVerdict {
  icon = CLOSE;
  defaultLabel = 'Avoid';
}
