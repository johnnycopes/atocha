import { Day } from './day.type';
import { Dish } from './dish.interface';
import { Orientation } from './orientation.type';

export interface MenuEntry {
  day: Day;
  dishes: Dish[];
}

export interface Menu {
  id: string;
  uid: string;
  name: string;
  favorited: boolean;
  startDay: Day;
  contents: {
    [day in Day]: string[];
  };
  entries: MenuEntry[];
  orientation: Orientation;
  fallbackText: string;
}
