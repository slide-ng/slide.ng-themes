import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RENDER_CONTEXT } from 'slide-ng/lib/slide-context';

type Scheme = 'light' | 'dark';

const KEY = 'adev-scheme';
const root = document.documentElement;

function stored(): Scheme | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function initial(): Scheme {
  const set = root.dataset['adevScheme'];
  if (set === 'light' || set === 'dark') return set;
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return stored() ?? system;
}

@Component({
  selector: 'adev-global-top',
  template: `
    @if (shown) {
      <button
        type="button"
        class="adev-scheme-button"
        aria-label="Switch slide colour scheme"
        [attr.aria-pressed]="scheme() === 'dark'"
        (click)="toggle()"
      >
        @if (scheme() === 'dark') {
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
          </svg>
        } @else {
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"
            />
          </svg>
        }
      </button>
    }
  `,
})
export default class AdevGlobalTop {
  shown = ['slide', 'presenter'].includes(inject(RENDER_CONTEXT));
  scheme = signal<Scheme>(initial());

  constructor() {
    root.dataset['adevScheme'] = this.scheme();
    const watch = new MutationObserver(() => {
      const now = root.dataset['adevScheme'];
      if (now === 'light' || now === 'dark') this.scheme.set(now);
    });
    watch.observe(root, { attributes: true, attributeFilter: ['data-adev-scheme'] });
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        root.dataset['adevScheme'] = e.newValue;
      }
    };
    window.addEventListener('storage', onStorage);
    inject(DestroyRef).onDestroy(() => {
      watch.disconnect();
      window.removeEventListener('storage', onStorage);
    });
  }

  toggle() {
    const next: Scheme = this.scheme() === 'dark' ? 'light' : 'dark';
    root.dataset['adevScheme'] = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }
}
