import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RENDER_CONTEXT } from 'slide-ng/lib/slide-context';

const EMBED_HOSTS = ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com'];

@Component({
  selector: 'adev-video',
  host: { class: 'adev-video' },
  template: `
    <div class="adev-video-frame">
      @if (embed(); as url) {
        @if (playing()) {
          <iframe
            class="adev-video-iframe"
            [src]="url"
            [title]="title()"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="encrypted-media; picture-in-picture; fullscreen"
          ></iframe>
        } @else {
          <button
            type="button"
            class="adev-video-poster"
            [attr.aria-label]="'Play video: ' + title()"
            [disabled]="!interactive"
            (click)="playing.set(true)"
          >
            <span class="adev-video-title">{{ title() }}</span>
            <svg class="adev-video-play" viewBox="0 0 68 48" aria-hidden="true">
              <rect width="68" height="48" rx="12" />
              <path d="M27 13 47 24 27 35Z" />
            </svg>
          </button>
        }
      } @else {
        <div class="adev-video-poster adev-video-invalid">
          <span class="adev-video-title">{{ title() }}</span>
        </div>
      }
    </div>
  `,
})
export class AdevVideo {
  src = input.required<string>();
  title = input('Video');

  protected playing = signal(false);
  protected interactive = ['slide', 'presenter'].includes(inject(RENDER_CONTEXT));
  private sanitizer = inject(DomSanitizer);

  protected embed = computed(() => {
    let url: URL;
    try {
      url = new URL(this.src());
    } catch {
      return null;
    }
    if (url.protocol !== 'https:' || !EMBED_HOSTS.includes(url.hostname)) return null;
    if (!url.pathname.startsWith('/embed/')) return null;
    url.hostname = 'www.youtube-nocookie.com';
    url.searchParams.set('autoplay', '1');
    url.searchParams.set('rel', '0');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString());
  });
}
