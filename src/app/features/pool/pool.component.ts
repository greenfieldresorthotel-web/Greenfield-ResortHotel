import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CountUpDirective } from '../../shared/directives/count-up.directive';

@Component({
  selector: 'app-pool',
  standalone: true,
  imports: [MatIconModule, RevealDirective, CountUpDirective],
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoolComponent {
  protected readonly features = [
    { icon: 'straighten', title: '50-Metre Infinity Pool', description: 'Our flagship pool stretches 50 metres, cantilevered over the forest valley with a stunning infinity edge that dissolves into the horizon.' },
    { icon: 'thermostat', title: 'Year-Round Heating', description: 'Maintained at a precise 29°C throughout the year, ensuring a perfect swim regardless of the season.' },
    { icon: 'beach_access', title: 'Pool Side Bar', description: 'Dishes & drinks served throughout the day.' },
  ];

  protected readonly rules = [
    'Appropriate swimwear required at all times',
    'Children under 12 must be accompanied by an adult',
    'Please shower before entering the pool',
    'No running or diving in the pool area',
    'Glassware is not permitted in the pool area',
    'Towels provided complimentary',
    'Pool capacity limited to 15 guests for your comfort',
  ];

  protected readonly galleryImages = [
    { src: 'https://picsum.photos/seed/pool-g1/800/600', alt: 'Infinity Pool at Dawn' },
    { src: 'https://picsum.photos/seed/pool-g2/800/600', alt: 'Poolside Cabanas' },
    { src: 'https://picsum.photos/seed/pool-g3/800/600', alt: 'Jacuzzi Terrace' },
    { src: 'https://picsum.photos/seed/pool-g4/800/600', alt: 'The Reef Bar' },
    { src: 'https://picsum.photos/seed/pool-g5/800/600', alt: 'Children\'s Pool' },
    { src: 'https://picsum.photos/seed/pool-g6/800/600', alt: 'Evening Pool Ambiance' }
  ];
}
