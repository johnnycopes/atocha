import { Day } from "./day.type";
import { Dish } from "./dish.interface";

export interface MenuEntry {
  day: Day;
  dishes: Dish[];
}
