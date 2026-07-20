import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { GalleryItem } from '../models/gallery-item.model';
import { environment } from '../../../environments/environment';

const MOCK_GALLERY: GalleryItem[] = [
  // Rooms & Suites
  { id: 'r1', title: 'Deluxe Room', image: '/images/rooms/3.jpg', category: 'rooms', featured: true },
  { id: 'r2', title: 'Deluxe Room Interior', image: '/images/rooms/1.jpg', category: 'rooms' },
  { id: 'r3', title: 'Deluxe Room View', image: '/images/rooms/2.jpg', category: 'rooms' },
  { id: 'r4', title: 'Deluxe Room Bed', image: '/images/rooms/4.jpg', category: 'rooms' },
  { id: 'r5', title: 'Deluxe Room Amenities', image: '/images/rooms/5.jpg', category: 'rooms' },
  { id: 'r6', title: 'Deluxe Room Bathroom', image: '/images/rooms/6.jpg', category: 'rooms' },
  { id: 'r7', title: 'Deluxe Room Balcony', image: '/images/rooms/7.jpg', category: 'rooms' },
  { id: 'r8', title: 'Deluxe Room', image: '/images/rooms/room8.jpg', category: 'rooms' },
  { id: 'r9', title: 'Deluxe Room', image: '/images/rooms/room9.jpg', category: 'rooms' },
  { id: 'r10', title: 'Deluxe Room', image: '/images/rooms/room10.jpg', category: 'rooms' },
  { id: 'r11', title: 'Deluxe Room', image: '/images/rooms/room11.jpg', category: 'rooms' },

  // Dining
  { id: 'd1', title: 'Green Field Restaurant', image: '/images/dining/dining1.jpg', category: 'dining', featured: true },
  { id: 'd2', title: 'Restaurant Dining Area', image: '/images/dining/dining2.jpg', category: 'dining' },
  { id: 'd3', title: 'Restaurant Interior', image: '/images/dining/dining3.jpg', category: 'dining' },
  { id: 'd4', title: 'Dining Experience', image: '/images/dining/dining4.jpg', category: 'dining' },
  { id: 'd5', title: 'Restaurant Ambiance', image: '/images/dining/dining5.jpg', category: 'dining' },
  { id: 'd6', title: 'Bar & Restaurant', image: '/images/dining/dining6.jpg', category: 'dining' },
  { id: 'd7', title: 'Restaurant Seating', image: '/images/dining/dining7.jpg', category: 'dining' },

  // Pool
  { id: 'p1', title: 'Resort Pool', image: '/images/pool/pool1.jpg', category: 'pool', featured: true },
  { id: 'p2', title: 'Pool Area', image: '/images/pool/pool2.jpg', category: 'pool' },
  { id: 'p3', title: 'Poolside Relaxation', image: '/images/pool/pool3.jpg', category: 'pool' },

  // Resort overview (All / Estate Grounds)
  { id: 'b1', title: 'Greenfield Resort', image: '/images/BG/bg1.jpg', category: 'grounds', featured: true },
  { id: 'b2', title: 'Resort Grounds', image: '/images/BG/bg2.jpg', category: 'grounds' },
  { id: 'b3', title: 'Resort Exterior', image: '/images/BG/bg3.jpg', category: 'grounds' },
  { id: 'b4', title: 'Resort Landscape', image: '/images/BG/bg4.jpg', category: 'grounds' },
  { id: 'b5', title: 'Resort Views', image: '/images/BG/bg5.jpg', category: 'grounds' },
  { id: 'b6', title: 'Greenfield Estate', image: '/images/BG/bg6.jpg', category: 'grounds' },
  { id: 'b7', title: 'Resort Surroundings', image: '/images/BG/bg7.jpg', category: 'grounds' },
  { id: 'b8', title: 'Greenfield Resort', image: '/images/BG/bg8.jpg', category: 'grounds' }
];

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = true;

  getAll(): Observable<GalleryItem[]> {
    if (this.useMock) return of(MOCK_GALLERY).pipe(delay(400));
    return this.http.get<GalleryItem[]>(`${this.apiUrl}/gallery`);
  }

  getByCategory(category: string): Observable<GalleryItem[]> {
    if (this.useMock) {
      const items = category === 'all' ? MOCK_GALLERY : MOCK_GALLERY.filter(g => g.category === category);
      return of(items).pipe(delay(200));
    }
    return this.http.get<GalleryItem[]>(`${this.apiUrl}/gallery?category=${category}`);
  }
}
