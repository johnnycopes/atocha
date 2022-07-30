import { DayNameDisplay } from "./date-name-display.type";
import { Day } from "./day.type";
import { Orientation } from "./orientation.type";

export interface UserPreferences {
  darkMode: boolean;
  dayNameDisplay: DayNameDisplay;
  defaultMenuStartDay: Day;
  emptyMealText: string;
  mealOrientation: Orientation;
}
