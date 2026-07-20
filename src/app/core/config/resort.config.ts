export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface DirectionGuide {
  from: string;
  detail: string;
  icon: string;
}

// Casica, Anda — text geocoding alone can pin Candijay; coordinates keep the map in Anda.
const MAP_LAT = 9.7554114;
const MAP_LNG = 124.5723009;

export const RESORT_CONFIG = {
  name: 'Green Field Resort Hotel',
  shortName: 'Greenfield',
  tagline: 'RESORT & SPA',
  location: 'Purok 2, Casica, Anda, Bohol, Philippines',
  address: {
    line1: 'Purok 2, Casica',
    line2: 'Anda, Bohol, Philippines',
    full: 'Purok 2, Casica, Anda, Bohol, Philippines'
  },
  phone: '0939 422 0276',
  phoneHref: 'tel:+639394220276',
  email: 'greenfield.resorthotel@gmail.com',
  hours: '24 hours, 7 days a week',
  map: {
    lat: MAP_LAT,
    lng: MAP_LNG,
    embedUrl: `https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}&hl=en&z=17&output=embed`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${MAP_LAT},${MAP_LNG}`
  },
  socialLinks: [
    {
      icon: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61578175839518'
    }
  ] satisfies SocialLink[],
  directions: [
    {
      from: 'Tagbilaran City / Airport',
      detail: 'Approximately 2.5 hours by car via the Bohol Circumferential Road to Anda.',
      icon: 'flight'
    },
    {
      from: 'Panglao Island',
      detail: 'Roughly 2 hours by road — a scenic inland drive after your beach stay.',
      icon: 'beach_access'
    },
    {
      from: 'Jagna Port',
      detail: 'Ferry arrivals from Cebu; Anda is about 1.5 hours south by car.',
      icon: 'directions_boat'
    }
  ] satisfies DirectionGuide[]
} as const;
