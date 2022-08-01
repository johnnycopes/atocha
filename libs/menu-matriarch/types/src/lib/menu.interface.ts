import { Day } from './day.type';
import { Dish } from './dish.interface';
import { Orientation } from './orientation.type';

export interface MenuEntry {
  day: Day;
  dishes: Dish[];
}

export interface MenuDto {
  id: string;
  uid: string;
  name: string;
  favorited: boolean;
  startDay: Day;
  contents: {
    [day in Day]: string[];
  };
}

export interface Menu extends MenuDto {
  entries: MenuEntry[];
  orientation: Orientation;
  fallbackText: string;
}
