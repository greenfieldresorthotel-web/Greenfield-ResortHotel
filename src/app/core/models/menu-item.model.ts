export type MenuCategory = 'starter' | 'main' | 'dessert' | 'beverage';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  chefRecommended: boolean;
  dietary: string[];
  prepTime: number;
  ingredients?: string[];
}
