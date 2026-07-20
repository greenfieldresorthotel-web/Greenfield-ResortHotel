import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Greenfield Resort – Luxury at Its Finest'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About Us – Greenfield Resort'
  },
  {
    path: 'rooms',
    loadComponent: () => import('./features/rooms/rooms.component').then(m => m.RoomsComponent),
    title: 'Rooms & Suites – Greenfield Resort'
  },
  {
    path: 'rooms/:id',
    loadComponent: () => import('./features/rooms/room-detail/room-detail.component').then(m => m.RoomDetailComponent),
    title: 'Room Details – Greenfield Resort'
  },
  {
    path: 'booking',
    redirectTo: 'contact',
    pathMatch: 'full'
  },
  {
    path: 'restaurant',
    loadComponent: () => import('./features/restaurant/restaurant.component').then(m => m.RestaurantComponent),
    title: 'The Canopy Restaurant – Greenfield Resort'
  },
  {
    path: 'pool',
    loadComponent: () => import('./features/pool/pool.component').then(m => m.PoolComponent),
    title: 'Infinity Pool – Greenfield Resort'
  },
  {
    path: 'gallery',
    loadComponent: () => import('./features/gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Gallery – Greenfield Resort'
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services.component').then(m => m.ServicesComponent),
    title: 'Services & Amenities – Greenfield Resort'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us – Greenfield Resort'
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 – Greenfield Resort'
  }
];
