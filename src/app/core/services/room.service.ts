import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Room } from '../models/room.model';
import { environment } from '../../../environments/environment';

/**
 * Room types — not individual room numbers.
 * All 8 physical rooms share the same deluxe layout on the 1st and 2nd floors.
 */
const ROOM_TYPES: Room[] = [
  {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    type: 'standard',
    typeLabel: 'Deluxe Room',
    description:
      'Our Deluxe Room is the only room type at Green Field Resort — a uniform 44 sqm layout on every floor, designed for rest after a day exploring Anda and Bohol. Each of our eight rooms includes air conditioning, a private bathroom with hot and cold shower, Smart TV, complimentary breakfast, and the same thoughtful amenities throughout. All rooms on the 1st and 2nd floors are identical, so every guest enjoys the same level of comfort. Contact us to enquire about availability and our current opening rate.',
    shortDescription:
      'Uniform 44 sqm deluxe rooms on the 1st and 2nd floors — same layout, same amenities, every stay.',
    price: 3900,
    rateNote: 'Opening rate · low season',
    sizeSqm: 44,
    maxGuests: 2,
    bedType: 'Queen Bed',
    quantity: 8,
    floors: '1st & 2nd Floor',
    amenities: [
      'Air-conditioning',
      'Private Bathroom',
      'Hot & Cold Shower',
      'Smart TV',
      'Free Wi-Fi',
      'Complimentary Breakfast',
      'Coffee & Tea',
      'Mini Refrigerator',
      'Wardrobe',
      'Fresh Towels',
      'Toiletries',
      'Daily Housekeeping',
      'Free Parking'
    ],
    images: [
      '/images/rooms/3.jpg',
      '/images/rooms/4.jpg',
      '/images/rooms/1.jpg',
      '/images/rooms/2.jpg',
      '/images/rooms/5.jpg',
      '/images/rooms/6.jpg',
      '/images/rooms/7.jpg'
    ],
    featured: true,
    available: true,
    badge: 'Opening Rate',
    bestFor: 'Couples, families & friends',
    assignmentNote:
      'All 8 rooms are the same deluxe layout and size. Your specific room is assigned at check-in (ground or upper floor based on availability). You may note a floor preference when you enquire.'
  }
];

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = true;

  getAll(): Observable<Room[]> {
    if (this.useMock) return of(ROOM_TYPES).pipe(delay(400));
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`);
  }

  getById(id: string): Observable<Room | undefined> {
    if (this.useMock) {
      const room = ROOM_TYPES.find(r => r.id === id);
      return of(room).pipe(delay(300));
    }
    return this.http.get<Room>(`${this.apiUrl}/rooms/${id}`);
  }

  getFeatured(): Observable<Room[]> {
    if (this.useMock) return of(ROOM_TYPES.filter(r => r.featured)).pipe(delay(300));
    return this.http.get<Room[]>(`${this.apiUrl}/rooms?featured=true`);
  }
}
