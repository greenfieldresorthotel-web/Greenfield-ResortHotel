import { Component, OnInit, signal, inject, computed, viewChildren, ElementRef, effect, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GalleryService } from '../../core/services/gallery.service';
import { GalleryItem, GalleryCategory } from '../../core/models/gallery-item.model';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatIconModule, RevealDirective],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  private readonly galleryService = inject(GalleryService);

  protected readonly allItems = signal<GalleryItem[]>([]);
  protected readonly activeCategory = signal<GalleryCategory>('all');
  protected readonly lightboxOpen = signal<boolean>(false);
  protected readonly lightboxIndex = signal<number>(0);

  protected readonly categories: { label: string; value: GalleryCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Rooms & Suites', value: 'rooms' },
    { label: 'Dining', value: 'dining' },
    { label: 'Pool & Spa', value: 'pool' },
    { label: 'Resort', value: 'grounds' }
  ];

  protected readonly filteredItems = computed(() => {
    const cat = this.activeCategory();
    const items = this.allItems();
    return cat === 'all' ? items : items.filter(i => i.category === cat);
  });

  private readonly filterButtons = viewChildren<ElementRef<HTMLButtonElement>>('filterBtn');
  protected readonly pillStyle = signal<{ left: string; top: string; width: string; height: string; opacity: number }>({
    left: '0px', top: '0px', width: '0px', height: '0px', opacity: 0
  });

  constructor() {
    effect(() => {
      const cat = this.activeCategory();
      const buttons = this.filterButtons();
      const index = this.categories.findIndex(c => c.value === cat);
      const btn = buttons[index]?.nativeElement;

      if (btn) {
        this.pillStyle.set({
          left: `${btn.offsetLeft}px`,
          top: `${btn.offsetTop}px`,
          width: `${btn.offsetWidth}px`,
          height: `${btn.offsetHeight}px`,
          opacity: 1
        });
      }
    });

    afterNextRender(() => {
      const buttons = this.filterButtons();
      const btn = buttons[0]?.nativeElement;
      if (btn) {
        this.pillStyle.set({
          left: `${btn.offsetLeft}px`,
          top: `${btn.offsetTop}px`,
          width: `${btn.offsetWidth}px`,
          height: `${btn.offsetHeight}px`,
          opacity: 1
        });
      }
    });
  }

  ngOnInit(): void {
    this.galleryService.getAll().subscribe(items => this.allItems.set(items));
  }

  protected setCategory(cat: GalleryCategory): void {
    this.activeCategory.set(cat);
  }

  protected openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
  }

  protected closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  protected prevImage(): void {
    const items = this.filteredItems();
    this.lightboxIndex.update(i => (i - 1 + items.length) % items.length);
  }

  protected nextImage(): void {
    const items = this.filteredItems();
    this.lightboxIndex.update(i => (i + 1) % items.length);
  }
}
