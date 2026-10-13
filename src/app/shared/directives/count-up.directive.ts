import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, PLATFORM_ID, SimpleChanges, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Animates the host element's text content counting up to a target number
 * once it scrolls into view. Re-triggers (without re-observing) whenever the
 * target value changes after the first reveal, so it also works for live
 * values like a booking total.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnChanges, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;
  private frame?: number;
  private hasRevealed = false;
  private currentValue = 0;

  /** Target numeric value to count up to. */
  @Input('appCountUp') target = 0;

  /** Duration in ms. */
  @Input() countUpDuration = 1400;

  /** Optional prefix/suffix, e.g. '$' and '/ night'. */
  @Input() countUpPrefix = '';
  @Input() countUpSuffix = '';

  /** Decimal places to render. */
  @Input() countUpDecimals = 0;

  /** Whether to render thousand separators (e.g. disable for plain years like 2026). */
  @Input() countUpGrouping = true;

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.render(this.target);
      this.currentValue = this.target;
      this.hasRevealed = true;
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.animateTo(this.target);
      this.hasRevealed = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.hasRevealed) {
            this.hasRevealed = true;
            this.animateTo(this.target);
            this.observer?.unobserve(this.el.nativeElement);
          }
        }
      },
      { threshold: 0.3 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const targetChange = changes['target'] ?? changes['appCountUp'];
    if (this.isBrowser && targetChange && !targetChange.isFirstChange() && this.hasRevealed) {
      this.animateTo(this.target);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.isBrowser && this.frame !== undefined) cancelAnimationFrame(this.frame);
  }

  private animateTo(target: number): void {
    if (this.frame) cancelAnimationFrame(this.frame);

    const start = this.currentValue;
    const diff = target - start;
    const duration = this.countUpDuration;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + diff * eased;

      this.currentValue = value;
      this.render(value);

      if (progress < 1) {
        this.frame = requestAnimationFrame(step);
      } else {
        this.currentValue = target;
        this.render(target);
      }
    };

    this.frame = requestAnimationFrame(step);
  }

  private render(value: number): void {
    const formatted = value.toLocaleString(undefined, {
      minimumFractionDigits: this.countUpDecimals,
      maximumFractionDigits: this.countUpDecimals,
      useGrouping: this.countUpGrouping
    });
    this.el.nativeElement.textContent = `${this.countUpPrefix}${formatted}${this.countUpSuffix}`;
  }
}
