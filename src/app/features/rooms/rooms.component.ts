import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/models/room.model';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, RevealDirective],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsComponent implements OnInit {
  private readonly roomService = inject(RoomService);
  private readonly route = inject(ActivatedRoute);

  protected readonly roomTypes = signal<Room[]>([]);
  protected readonly message = signal<string>('');

  ngOnInit(): void {
    this.roomService.getAll().subscribe(rooms => this.roomTypes.set(rooms));
    const msg = this.route.snapshot.queryParamMap.get('message');
    if (msg) this.message.set(msg);
  }
}
