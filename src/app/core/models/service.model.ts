export interface ResortService {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: 'accommodation' | 'dining' | 'activities' | 'events' | 'convenience';
  featured?: boolean;
}

export interface ResortPackage {
  id: string;
  title: string;
  description: string;
  includes: string[];
  priceFrom?: number;
  icon: string;
}
