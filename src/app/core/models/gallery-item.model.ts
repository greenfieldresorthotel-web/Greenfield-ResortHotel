export type GalleryCategory = 'all' | 'rooms' | 'dining' | 'pool' | 'spa' | 'grounds' | 'events';

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: Exclude<GalleryCategory, 'all'>;
  featured?: boolean;
}
