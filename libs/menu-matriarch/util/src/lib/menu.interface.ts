import { Day } from './day.type';
import { Dish } from './dish.interface';
import { Orientation } from './orientation.type';

export interface Menu {
  /** Menu's unique ID */
  id: string;
  /** Unique ID of the user associated with the menu */
  uid: string;
  /** Display name of the menu */
  name: string;
  /** (INACTIVE) Whether the menu has been saved as a user favorite */
  favorited: boolean;
  /** Which day of the week comes first in the menu */
  startDay: Day;
  /** The dish IDs belonging to the menu, grouped by day of th week */
  contents: {
    [day in Day]: string[];
  };
  /** The dish IDs of each day in the menu, starting with the preferred start day */
  entries: MenuEntry[];
  /** Which direction to display the dishes belonging to a meal  */
  orientation: Orientation;
  /** The text to display in a day without any dishes */
  fallbackText: string;
}

export interface MenuEntry {
  day: Day;
  dishes: Dish[];
}
