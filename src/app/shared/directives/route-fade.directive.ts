import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

/**
 * Replays the `.route-fade-in` CSS animation on the host element every time
 * a navigation completes, so route changes feel like a smooth transition
 * instead of an instant snap. Pure CSS/Router — no animation package needed.
 */
@Directive({
  selector: '[appRouteFade]',
  standalone: true
})
export class RouteFadeDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);
  private sub?: Subscription;

  ngOnInit(): void {
    this.replay();
    this.sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.replay());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private replay(): void {
    const host = this.el.nativeElement;
    host.classList.remove('route-fade-in');
    void host.offsetWidth;
    host.classList.add('route-fade-in');
  }
}
