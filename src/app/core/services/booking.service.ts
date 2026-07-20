import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Booking } from '../models/booking.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = true;

  createBooking(booking: Booking): Observable<Booking> {
    if (this.useMock) {
      const created: Booking = {
        ...booking,
        id: `BKG-${Date.now()}`,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      return of(created).pipe(delay(1200));
    }
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking);
  }

  getBookings(): Observable<Booking[]> {
    if (this.useMock) return of([]).pipe(delay(300));
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  calculateTotalPrice(pricePerNight: number, checkIn: Date, checkOut: Date): number {
    const nights = this.calculateNights(checkIn, checkOut);
    return nights * pricePerNight;
  }

  calculateNights(checkIn: Date, checkOut: Date): number {
    const ms = checkOut.getTime() - checkIn.getTime();
    return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }
}
