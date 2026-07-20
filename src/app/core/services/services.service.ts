import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ResortPackage, ResortService } from '../models/service.model';

const SERVICES: ResortService[] = [
  {
    id: 'rooms',
    icon: 'hotel',
    title: 'Comfortable Accommodations',
    description: 'Eight well-appointed rooms with air conditioning, private bathrooms, and a relaxing ambiance for couples, families, and groups.',
    category: 'accommodation',
    featured: true
  },
  {
    id: 'pool',
    icon: 'pool',
    title: 'Swimming Pool',
    description: 'Inviting pools for a refreshing dip — perfect for families and guests looking to unwind in the Bohol sunshine.',
    category: 'activities',
    featured: true
  },
  {
    id: 'restaurant',
    icon: 'restaurant',
    title: 'Restaurant & Bar',
    description: 'Filipino favorites and international dishes served in a warm, relaxed setting for breakfast, lunch, and dinner.',
    category: 'dining',
    featured: true
  },
  {
    id: 'events',
    icon: 'celebration',
    title: 'Events & Celebrations',
    description: 'Host birthdays, reunions, team-building, and intimate gatherings with our function space and catering support.',
    category: 'events',
    featured: true
  },
  {
    id: 'tours',
    icon: 'explore',
    title: 'Tour Assistance',
    description: 'We help arrange visits to Chocolate Hills, island hopping, cave pools, and other Anda and Bohol highlights.',
    category: 'activities'
  },
  {
    id: 'transfer',
    icon: 'airport_shuttle',
    title: 'Transport & Transfers',
    description: 'Shuttle and transfer arrangements from Tagbilaran, Panglao, and nearby ports upon request.',
    category: 'convenience'
  },
  {
    id: 'wifi',
    icon: 'wifi',
    title: 'Free Wi-Fi',
    description: 'Stay connected throughout the resort with complimentary wireless internet access.',
    category: 'convenience'
  },
  {
    id: 'parking',
    icon: 'local_parking',
    title: 'Free Parking',
    description: 'Secure on-site parking for guests traveling by car or motorcycle.',
    category: 'convenience'
  },
  {
    id: 'laundry',
    icon: 'local_laundry_service',
    title: 'Laundry Service',
    description: 'Keep your wardrobe fresh during extended stays with our laundry assistance.',
    category: 'convenience'
  },
  {
    id: 'massage',
    icon: 'spa',
    title: 'Massage Service',
    description: 'Relax and rejuvenate with our professional massage services available upon request.',
    category: 'convenience',
    featured: true
  }
];

const PACKAGES: ResortPackage[] = [
  {
    id: 'family',
    title: 'Family Getaway',
    description: 'A relaxed package for families seeking pool time, good food, and quality time together.',
    includes: ['2-night stay', 'Daily breakfast', 'Pool access', 'Free parking'],
    priceFrom: 4500,
    icon: 'family_restroom'
  },
  {
    id: 'couple',
    title: 'Romantic Escape',
    description: 'Perfect for couples — quiet rooms, poolside evenings, and a peaceful Anda retreat.',
    includes: ['2-night stay', 'Welcome drinks', 'Pool access', 'Late check-out (subject to availability)'],
    priceFrom: 3800,
    icon: 'favorite'
  },
  {
    id: 'corporate',
    title: 'Team Building & Corporate',
    description: 'Ideal for small teams and company outings with function space and group dining options.',
    includes: ['Function room use', 'Lunch or dinner set', 'Pool access', 'Dedicated coordinator'],
    icon: 'groups'
  },
  {
    id: 'celebration',
    title: 'Birthday & Celebration',
    description: 'Make milestones memorable with our event setup, catering, and celebration packages.',
    includes: ['Venue setup', 'Custom menu options', 'Sound system', 'Decoration assistance'],
    icon: 'cake'
  }
];

@Injectable({ providedIn: 'root' })
export class ServicesService {
  getAll(): Observable<ResortService[]> {
    return of(SERVICES).pipe(delay(150));
  }

  getFeatured(): Observable<ResortService[]> {
    return of(SERVICES.filter(s => s.featured)).pipe(delay(150));
  }

  getPackages(): Observable<ResortPackage[]> {
    return of(PACKAGES).pipe(delay(150));
  }
}
