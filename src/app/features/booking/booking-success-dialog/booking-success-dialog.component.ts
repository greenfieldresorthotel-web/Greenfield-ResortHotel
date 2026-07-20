import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-booking-success-dialog',
  standalone: true,
  imports: [MatDialogModule, RouterLink, MatIconModule],
  templateUrl: './booking-success-dialog.component.html',
  styleUrls: ['./booking-success-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingSuccessDialogComponent {
  protected readonly data: Booking = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<BookingSuccessDialogComponent>);

  close(): void {
    this.dialogRef.close();
  }
}
