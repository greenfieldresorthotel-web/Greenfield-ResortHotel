import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { RESORT_CONFIG } from '../../core/config/resort.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatIconModule, RevealDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly resort = RESORT_CONFIG;
  protected readonly socialLinks = RESORT_CONFIG.socialLinks;

  protected readonly quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Our Rooms', path: '/rooms' },
    { label: 'Services', path: '/services' },
    { label: 'Restaurant', path: '/restaurant' },
    { label: 'Swimming Pool', path: '/pool' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' }
  ];
}
