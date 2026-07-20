import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MenuItem } from '../models/menu-item.model';
import { environment } from '../../../environments/environment';

const MOCK_MENU: MenuItem[] = [
  {
    id: 'wagyu-tenderloin',
    name: 'Wagyu Beef Tenderloin',
    description: 'A5 Japanese Wagyu tenderloin, slow-roasted to perfection, accompanied by black truffle jus, heirloom root vegetables, and a quenelle of Périgord black truffle butter. Our most celebrated signature dish.',
    price: 95,
    category: 'main',
    image: 'https://picsum.photos/seed/wagyu-dish/800/600',
    chefRecommended: true,
    dietary: ['gluten-free'],
    prepTime: 35,
    ingredients: ['A5 Wagyu Beef', 'Black Truffle', 'Heirloom Vegetables', 'Périgord Butter', 'Red Wine Jus']
  },
  {
    id: 'truffle-risotto',
    name: 'Black Truffle Risotto',
    description: 'Carnaroli rice slow-cooked in aged Parmesan broth, finished with freshly shaved Périgord black truffle, 24-month aged Parmigiano-Reggiano, and a drizzle of white truffle oil. A vegetarian masterpiece from our forests to your table.',
    price: 65,
    category: 'main',
    image: 'https://picsum.photos/seed/truffle-risotto/800/600',
    chefRecommended: true,
    dietary: ['vegetarian', 'gluten-free'],
    prepTime: 28,
    ingredients: ['Carnaroli Rice', 'Black Truffle', 'Parmigiano-Reggiano', 'White Truffle Oil', 'Parmesan Broth']
  },
  {
    id: 'champagne-lobster',
    name: 'Champagne-Poached Lobster',
    description: 'Live Canadian lobster tail poached in Moët & Chandon Champagne, served with saffron beurre blanc, lobster bisque foam, and garden microgreens. Accompanied by a glass of vintage Blanc de Blancs Champagne.',
    price: 120,
    category: 'main',
    image: 'https://picsum.photos/seed/lobster-dish/800/600',
    chefRecommended: false,
    dietary: ['gluten-free'],
    prepTime: 45,
    ingredients: ['Canadian Lobster', 'Moët Champagne', 'Saffron', 'Beurre Blanc', 'Microgreens']
  },
  {
    id: 'mango-souffle',
    name: 'Mango Blossom Soufflé',
    description: 'A celestial warm soufflé made with Alphonso mango purée and Madagascar vanilla, served with a salted caramel centre, accompanied by a coconut and kaffir lime ice cream. A dessert that captures the essence of tropical paradise.',
    price: 45,
    category: 'dessert',
    image: 'https://picsum.photos/seed/mango-souffle/800/600',
    chefRecommended: true,
    dietary: ['vegetarian'],
    prepTime: 20,
    ingredients: ['Alphonso Mango', 'Madagascar Vanilla', 'Salted Caramel', 'Coconut Ice Cream', 'Kaffir Lime']
  }
];

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = true;

  getMenu(): Observable<MenuItem[]> {
    if (this.useMock) return of(MOCK_MENU).pipe(delay(400));
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menu`);
  }

  getById(id: string): Observable<MenuItem | undefined> {
    if (this.useMock) {
      return of(MOCK_MENU.find(m => m.id === id)).pipe(delay(200));
    }
    return this.http.get<MenuItem>(`${this.apiUrl}/menu/${id}`);
  }
}
