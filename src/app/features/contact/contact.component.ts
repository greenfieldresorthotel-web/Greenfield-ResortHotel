import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RESORT_CONFIG } from '../../core/config/resort.config';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatIconModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly resort = RESORT_CONFIG;
  protected readonly mapEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    RESORT_CONFIG.map.embedUrl
  );
  protected readonly socialLinks = RESORT_CONFIG.socialLinks;

  protected readonly contactInfo = [
    { icon: 'location_on', label: 'Address', value: RESORT_CONFIG.address.full },
    { icon: 'phone', label: 'Reservations', value: RESORT_CONFIG.phone, href: RESORT_CONFIG.phoneHref },
    { icon: 'email', label: 'Email', value: RESORT_CONFIG.email, href: `mailto:${RESORT_CONFIG.email}` },
  ];
}
