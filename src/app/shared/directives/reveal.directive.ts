import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Adds a `.reveal` base class plus a staggered delay class, then flips on
 * `.in-view` the first time the host element crosses into the viewport.
 * Pure IntersectionObserver — no animation package or extra dependency needed.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** Stagger index (0-based). Mapped to `.reveal--delay-1` .. `.reveal--delay-6`. */
  @Input('appReveal') delayIndex: number | string = 0;

  /** Reveal animation variant: 'up' (default), 'left', 'right', 'scale'. */
  @Input('appRevealType') type: 'up' | 'left' | 'right' | 'scale' = 'up';

  ngOnInit(): void {
    const host = this.el.nativeElement;
    const index = Number(this.delayIndex) || 0;
    const delayClass = `reveal--delay-${Math.min(Math.max(index, 0), 6)}`;

    host.classList.add('reveal', `reveal--${this.type}`, delayClass);

    if (typeof IntersectionObserver === 'undefined') {
      host.classList.add('in-view');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            host.classList.add('in-view');
            this.observer?.unobserve(host);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
