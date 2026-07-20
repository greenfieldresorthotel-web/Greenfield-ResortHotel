import { Component, OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RoomService } from '../../../core/services/room.service';
import { Room } from '../../../core/models/room.model';
import { RESORT_CONFIG } from '../../../core/config/resort.config';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, RevealDirective],
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomDetailComponent implements OnInit {
  private readonly roomService = inject(RoomService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly room = signal<Room | null>(null);
  protected readonly activeImage = signal<number>(0);
  protected readonly loading = signal<boolean>(true);
  protected readonly resort = RESORT_CONFIG;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.roomService.getById(id).subscribe(r => {
      if (!r) {
        this.router.navigate(['/rooms']);
        return;
      }
      this.room.set(r);
      this.loading.set(false);
    });
  }

  protected setActiveImage(index: number): void {
    this.activeImage.set(index);
  }
}
