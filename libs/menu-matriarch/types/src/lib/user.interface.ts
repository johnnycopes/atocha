import { Day } from "./day.type";
import { Orientation } from "./orientation.type";

export type DayNameDisplay = 'full';

export interface UserPreferences {
  darkMode: boolean;
  dayNameDisplay: DayNameDisplay;
  defaultMenuStartDay: Day;
  emptyMealText: string;
  mealOrientation: Orientation;
}

export interface UserDto {
  uid: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

export type User = UserDto;
