import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface MenuPageImage {
  id: number;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule, MatIconModule, RevealDirective],
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantComponent {
  protected readonly menuPages: MenuPageImage[] = [
    {
      id: 1,
      src: '/images/restaurant/Food%20Menu/menu1.jpg',
      alt: 'Green Field Restaurant food menu — sizzling specialties, vegetables, noodles, and rice'
    },
    {
      id: 2,
      src: '/images/restaurant/Food%20Menu/menu2.jpg',
      alt: 'Green Field Restaurant food menu — page 2'
    },
    {
      id: 3,
      src: '/images/restaurant/Food%20Menu/menu3.jpg',
      alt: 'Green Field Restaurant food menu — page 3'
    },
    {
      id: 4,
      src: '/images/restaurant/Food%20Menu/menu4.jpg',
      alt: 'Green Field Restaurant food menu — page 4'
    },
  ];
  protected readonly beveragePages: MenuPageImage[] = [
    {
      id: 1,
      src: '/images/restaurant/Food%20Menu/bev1.jpeg',
      alt: 'Green Field Restaurant beverages — refreshing drinks and cocktails'
    },
    {
      id: 2,
      src: '/images/restaurant/Food%20Menu/bev2.jpeg',
      alt: 'Green Field Restaurant beverages — page 2'
    },
    {
      id: 3,
      src: '/images/restaurant/Food%20Menu/bev3.jpeg',
      alt: 'Green Field Restaurant beverages — page 3'
    },

  ];
}
