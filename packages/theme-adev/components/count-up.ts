import {
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { Nav } from 'slide-ng/lib/nav';
import { RENDER_CONTEXT, SLIDE_NO } from 'slide-ng/lib/slide-context';

@Component({
  selector: 'adev-count-up',
  host: { class: 'adev-count-up' },
  template:
    '<span class="adev-count-up-number" [style.min-width]="width()">{{ shown() }}</span>{{ suffix() }}',
})
export class AdevCountUp {
  to = input(0, { transform: numberAttribute });
  duration = input(1800, { transform: numberAttribute });
  suffix = input('');

  private nav = inject(Nav);
  private slideNo = inject(SLIDE_NO);
  private animated = inject(RENDER_CONTEXT) === 'slide';
  private current = signal(0);
  private frame = 0;

  width = computed(() => `${String(this.to()).length}ch`);
  shown = computed(() => (this.animated ? this.current() : this.to()));

  constructor() {
    effect(() => {
      if (!this.animated) return;
      if (this.nav.no() === this.slideNo) this.run();
      else this.reset();
    });
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  private run() {
    cancelAnimationFrame(this.frame);
    const target = this.to();
    const ms = this.duration();
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      this.current.set(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  private reset() {
    cancelAnimationFrame(this.frame);
    this.current.set(0);
  }
}
