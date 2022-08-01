import { Dish } from './dish.interface';
import { Tag } from './tag.interface';

export interface MealDto {
  id: string;
  uid: string;
  name: string;
  description: string;
  dishIds: string[];
  tagIds: string[];
}

export interface Meal extends Omit<MealDto, 'dishIds' | 'tagIds'> {
  dishes: Dish[];
  tags: Tag[];
}
