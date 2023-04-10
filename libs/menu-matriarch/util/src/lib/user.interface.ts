import { Day } from './day.type';
import { Orientation } from './orientation.type';

/** The application user */
export interface User {
  /** User's unique ID. Required for associating other data with their account */
  uid: string;
  /** User's real name associated with their email account */
  name: string;
  /** User's email account used to create their app account */
  email: string;
  /** Series of configurable user preferences */
  preferences: UserPreferences;
}

export interface UserPreferences {
  /** (INACTIVE) If `true`, display dark mode. Else, display light mode */
  darkMode: boolean;
  /** (INACTIVE) How to display day names in the Planner view */
  dayNameDisplay: DayNameDisplay;
  /** Which day comes first in a newly-created menu */
  defaultMenuStartDay: Day;
  /** The text to display in a meal without any dishes */
  emptyMealText: string;
  /** Which direction to display the dishes belonging to a meal  */
  mealOrientation: Orientation;
}

export type DayNameDisplay = 'full';
