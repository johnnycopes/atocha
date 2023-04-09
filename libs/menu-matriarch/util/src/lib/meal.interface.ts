import { Dish } from './dish.interface';
import { Tag } from './tag.interface';

export interface Meal {
  id: string;
  uid: string;
  name: string;
  description: string;
  dishes: Dish[];
  tags: Tag[];
}
