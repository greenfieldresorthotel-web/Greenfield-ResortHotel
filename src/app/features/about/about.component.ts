import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CountUpDirective } from '../../shared/directives/count-up.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, MatIconModule, RevealDirective, CountUpDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  protected readonly stats = [
    { value: 8, suffix: '', grouping: true, label: 'Deluxe Rooms' },
    { value: 2026, suffix: '', grouping: false, label: 'Est. Year' },
    { value: 8, suffix: '-10hr', grouping: true, label: 'Front Desk Service' },
    { value: 100, suffix: '%', grouping: true, label: 'Genuine Hospitality' }
  ];

  protected readonly timeline = [
    { year: '1893', event: 'The Greenfield Estate is founded by Sir Edward Ashworth on 2,000 acres of ancient forest.' },
    { year: '1952', event: 'The Ashworth family converts the estate into a private retreat for diplomats and heads of state.' },
    { year: '1987', event: 'First major renovation; The Canopy Restaurant and the infinity pool are added.' },
    { year: '2010', event: 'A landmark redesign by world-renowned architect Ando Sato earns a Forbes Five-Star rating.' },
    { year: '2019', event: 'The Greenfield Spa opens, featuring 12 treatment rooms and the Himalayan Salt Cave.' },
    { year: '2025', event: 'Named "Best Luxury Resort in Asia" at the International Hospitality Awards.' }
  ];

  protected readonly values = [
    { icon: 'eco', title: 'Nature-Inspired Sanctuary', description: 'Nestled amidst the lush landscapes of Anda, Bohol, Green Field Resort Hotel offers a peaceful inland retreat where guests can unwind, reconnect with nature, and enjoy the beauty of a serene environment away from the bustle of everyday life.' },
    { icon: 'people', title: 'Genuine Filipino Hospitality', description: 'We believe every guest should feel welcomed like family. Our dedicated team is committed to delivering warm, attentive, and personalized service that reflects the heart of Filipino hospitality from arrival to departure.' },
    { icon: 'star', title: 'Comfort and Quality', description: 'Every room, facility, and amenity is thoughtfully designed to provide comfort, cleanliness, and convenience. We continuously strive to create memorable experiences through exceptional accommodations, delicious cuisine, and relaxing recreational spaces.' },
    { icon: 'favorite', title: 'Creating Lasting Memories', description: 'Whether you are visiting for a family vacation, a romantic getaway, a celebration, or a peaceful retreat, our mission is to provide meaningful experiences and unforgettable moments that inspire guests to return time and time again.' }
  ];
}
