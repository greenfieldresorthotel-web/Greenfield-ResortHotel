import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ServicesService } from '../../core/services/services.service';
import { ResortPackage, ResortService } from '../../core/models/service.model';
import { RESORT_CONFIG } from '../../core/config/resort.config';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, RevealDirective],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  private readonly servicesService = inject(ServicesService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly resort = RESORT_CONFIG;
  protected readonly mapEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    RESORT_CONFIG.map.embedUrl
  );
  protected readonly services = signal<ResortService[]>([]);
  protected readonly packages = signal<ResortPackage[]>([]);

  ngOnInit(): void {
    this.servicesService.getAll().subscribe(items => this.services.set(items));
    this.servicesService.getPackages().subscribe(items => this.packages.set(items));
  }
}
