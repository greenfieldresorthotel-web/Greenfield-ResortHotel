export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id?: string;
  guestName: string;
  email: string;
  phone: string;
  roomId: string;
  roomName?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  specialRequests: string;
  totalNights?: number;
  pricePerNight?: number;
  totalPrice?: number;
  status?: BookingStatus;
  createdAt?: string;
}

export interface BookingFormData {
  guestName: string;
  email: string;
  phone: string;
  roomId: string;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  specialRequests: string;
}
