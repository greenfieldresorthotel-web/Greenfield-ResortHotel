import { Component, OnInit, signal, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BookingService } from '../../core/services/booking.service';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/room.model';
import { Booking } from '../../core/models/booking.model';
import { BookingSuccessDialogComponent } from './booking-success-dialog/booking-success-dialog.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CountUpDirective } from '../../shared/directives/count-up.directive';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule,
    MatDialogModule, MatIconModule, RevealDirective, CountUpDirective
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  private readonly roomService = inject(RoomService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  protected readonly rooms = signal<Room[]>([]);
  protected readonly submitting = signal<boolean>(false);
  protected readonly today = new Date();
  protected readonly tomorrow = new Date(Date.now() + 86400000);

  protected readonly bookingForm: FormGroup = this.fb.group({
    guestName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{8,15}$/)]],
    roomId: ['', Validators.required],
    checkIn: [null, Validators.required],
    checkOut: [null, Validators.required],
    adults: [2, [Validators.required, Validators.min(1), Validators.max(6)]],
    children: [0, [Validators.min(0), Validators.max(4)]],
    specialRequests: ['']
  });

  protected readonly selectedRoom = computed(() => {
    const id = this.bookingForm.get('roomId')?.value;
    return this.rooms().find(r => r.id === id) ?? null;
  });

  protected readonly nights = computed(() => {
    const checkIn: Date | null = this.bookingForm.get('checkIn')?.value;
    const checkOut: Date | null = this.bookingForm.get('checkOut')?.value;
    if (!checkIn || !checkOut) return 0;
    return this.bookingService.calculateNights(checkIn, checkOut);
  });

  protected readonly totalPrice = computed(() => {
    const room = this.selectedRoom();
    const n = this.nights();
    if (!room || n <= 0) return 0;
    return room.price * n;
  });

  ngOnInit(): void {
    this.roomService.getAll().subscribe(r => {
      this.rooms.set(r);
      const roomId = this.route.snapshot.queryParamMap.get('roomId');
      if (roomId) {
        this.bookingForm.patchValue({ roomId });
      }
    });
  }

  protected getError(field: string): string {
    const ctrl = this.bookingForm.get(field);
    if (!ctrl?.invalid || !ctrl.touched) return '';
    if (ctrl.errors?.['required']) return 'This field is required.';
    if (ctrl.errors?.['email']) return 'Please enter a valid email address.';
    if (ctrl.errors?.['minlength']) return `Minimum ${ctrl.errors['minlength'].requiredLength} characters required.`;
    if (ctrl.errors?.['pattern']) return 'Please enter a valid phone number.';
    if (ctrl.errors?.['min']) return `Minimum value is ${ctrl.errors['min'].min}.`;
    if (ctrl.errors?.['max']) return `Maximum value is ${ctrl.errors['max'].max}.`;
    return 'Invalid input.';
  }

  protected onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const form = this.bookingForm.value;
    const room = this.selectedRoom();
    const booking: Booking = {
      guestName: form.guestName,
      email: form.email,
      phone: form.phone,
      roomId: form.roomId,
      roomName: room?.name ?? '',
      checkIn: (form.checkIn as Date).toISOString().split('T')[0],
      checkOut: (form.checkOut as Date).toISOString().split('T')[0],
      adults: form.adults,
      children: form.children,
      specialRequests: form.specialRequests ?? '',
      totalNights: this.nights(),
      pricePerNight: room?.price ?? 0,
      totalPrice: this.totalPrice()
    };

    this.bookingService.createBooking(booking).subscribe({
      next: (confirmed) => {
        this.submitting.set(false);
        this.dialog.open(BookingSuccessDialogComponent, {
          width: '520px',
          data: confirmed,
          disableClose: true
        });
        this.bookingForm.reset({ adults: 2, children: 0 });
      },
      error: () => this.submitting.set(false)
    });
  }
}
