import { Dish } from './dish.interface';
import { Tag } from './tag.interface';

/**
 * A collection of dishes grouped together as a single
 * unit. It can have any number of dishes and tags
 */
export interface Meal {
  /** Meal's unique ID */
  id: string;
  /** Unique ID of the user associated with the meal */
  uid: string;
  /** Display name of the meal */
  name: string;
  /** High-level notes about the meal, displayed in both full and sumary views */
  description: string;
  /** The dishes used in the meal */
  dishes: Dish[];
  /** The tags applied to the meal */
  tags: Tag[];
}
