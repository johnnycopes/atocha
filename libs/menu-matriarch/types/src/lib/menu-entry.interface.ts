import { Day } from './day.type';
import { Dish } from './entities/dish.interface';

export interface MenuEntry {
  day: Day;
  dishes: Dish[];
}
