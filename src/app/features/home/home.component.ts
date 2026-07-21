import { Component, OnInit, OnDestroy, signal, inject, computed, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/room.model';
import { RESORT_CONFIG } from '../../core/config/resort.config';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, RevealDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly roomService = inject(RoomService);

  protected readonly socialLinks = RESORT_CONFIG.socialLinks;
  protected readonly featuredRooms = signal<Room[]>([]);
  protected readonly featuredRoom = computed(() => this.featuredRooms()[0] ?? null);
  protected readonly activeSlide = signal<number>(0);
  protected readonly heroParallax = signal<number>(0);

  protected readonly currentHeroSlide = computed(() => this.heroSlides[this.activeSlide()]);

  private slideTimer?: ReturnType<typeof setInterval>;

  protected readonly heroSlides = [
    {
      image: 'assets/homepool.jpeg',
      overline: 'Anda, Bohol',
      title: 'Your Sanctuary in Nature',
      subtitle: 'A peaceful inland retreat where comfort, warmth, and genuine Filipino hospitality come together.',
      cta: 'Discover Our Story',
      link: '/about'
    },
    {
      image: '/images/rooms/room24.jpeg',
      overline: 'Accommodations',
      title: 'Eight Deluxe Rooms',
      subtitle: 'Uniform 8 rooms — same layout and amenities on the 1st and 2nd floors.',
      cta: 'Explore Our Rooms',
      link: '/rooms'
    },
    {
      image: 'images/pool/poolover.jpeg',
      overline: 'Aquatic Escape',
      title: 'Refresh by the Pool',
      subtitle: 'Unwind in our inviting pools — the perfect way to enjoy sunny days in Bohol.',
      cta: 'Discover the Pool',
      link: '/pool'
    },
    {
      image: 'assets/drink.jpeg',
      overline: 'Dining',
      title: 'Bar & Restaurant',
      subtitle: 'Filipino flavors and international favorites in a warm, relaxed atmosphere.',
      cta: 'View Our Menu',
      link: '/restaurant'
    }
  ];

  protected readonly amenities = [
    { icon: 'pool', title: 'Swimming Pool', description: 'Refreshing pools for families and guests looking to unwind under the Bohol sun.' },
    { icon: 'restaurant', title: 'Restaurant & Bar', description: 'Filipino specialties and international dishes served throughout the day.' },
    { icon: 'room_service', title: 'Room Service', description: 'Meals and refreshments delivered to your room at your convenience.' },
    { icon: 'celebration', title: 'Events & Celebrations', description: 'Birthdays, reunions, and team gatherings with function space and catering.' },
    { icon: 'explore', title: 'Tour Assistance', description: 'Help arranging Chocolate Hills, island hopping, and other Bohol adventures.' },
    { icon: 'wifi', title: 'Wi-Fi & Parking', description: 'Complimentary wireless internet and secure on-site parking for all guests.' }
  ];

  protected readonly roomShowcaseImages = {
    hero: '/images/rooms/5.jpg',
    thumbs: ['/images/rooms/roomshower.jpeg', '/images/rooms/room24.jpeg', '/images/rooms/room25.jpeg']
  };

  protected readonly galleryPreview = [
    { src: '/images/BG/bg8.jpg', alt: 'Greenfield Resort', featured: true },
    { src: '/images/rooms/3.jpg', alt: 'Deluxe Room' },
    { src: '/images/dining/dining1.jpg', alt: 'Green Field Restaurant' },
    { src: '/images/pool/pool1.jpg', alt: 'Resort Pool' },
    { src: '/images/BG/bg3.jpg', alt: 'Resort Grounds' }
  ];

  ngOnInit(): void {
    this.roomService.getFeatured().subscribe(rooms => this.featuredRooms.set(rooms));
    this.startSlider();
  }

  ngOnDestroy(): void {
    clearInterval(this.slideTimer);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.heroParallax.set(Math.min(window.scrollY * 0.4, 200));
  }

  private startSlider(): void {
    this.slideTimer = setInterval(() => {
      this.activeSlide.update(i => (i + 1) % this.heroSlides.length);
    }, 6000);
  }

  protected goToSlide(index: number): void {
    this.activeSlide.set(index);
    clearInterval(this.slideTimer);
    this.startSlider();
  }
}
