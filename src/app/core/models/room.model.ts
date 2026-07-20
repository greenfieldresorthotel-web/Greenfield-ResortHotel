export type RoomType = 'standard' | 'family';

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  typeLabel: string;
  description: string;
  shortDescription: string;
  price: number;
  maxGuests: number;
  bedType: string;
  /** How many physical rooms of this type exist. */
  quantity: number;
  /** e.g. "1st & 2nd Floor" */
  floors: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  available: boolean;
  /** Short marketing tag, e.g. "Best Value" */
  badge?: string;
  /** e.g. "Couples & solo travelers" */
  bestFor?: string;
  /** Shown on detail/booking — explains identical rooms. */
  assignmentNote?: string;
  /** Room size in square meters. */
  sizeSqm?: number;
  /** e.g. "Opening rate · low season" */
  rateNote?: string;
}
