import { Component, HostListener, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  protected readonly isScrolled = signal<boolean>(false);
  protected readonly menuOpen = signal<boolean>(false);

  protected readonly navLinks = [
    { label: 'Home', path: '/', exact: true },
    { label: 'About', path: '/about', exact: false },
    // { label: 'Rooms', path: '/rooms', exact: false },
    { label: 'Restaurant', path: '/restaurant', exact: false },
    { label: 'Pool', path: '/pool', exact: false },
    { label: 'Services', path: '/services', exact: false },
    { label: 'Gallery', path: '/gallery', exact: false }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 60);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
