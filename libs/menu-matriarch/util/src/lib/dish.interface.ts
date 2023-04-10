import { Tag } from './tag.interface';

/**
 * The fundamental unit in the app. Contains lots of
 * information about a particular dish, can be categorized
 * with tags, and can belong to any number of meals and/or menus.
 */
export interface Dish {
  /** Dish's unique ID */
  id: string;
  /** Unique ID of the user associated with the dish */
  uid: string;
  /** Which course of a meal a dish belongs to */
  type: DishType;
  /** Display name of the dish */
  name: string;
  /** (INACTIVE) Whether the dish has been saved as a user favorite */
  favorited: boolean;
  /** High-level notes about the dish, displayed in both full and sumary views */
  description: string;
  /** Link associated with the dish (typically a recipe) */
  link: string;
  /** In-depth notes about the dish, displayed only in full view. Saved as HTML */
  notes: string;
  /** The total number of menu days where a dish is referenced */
  usages: number;
  /** The unique IDs of any menu the dish belongs to */
  menuIds: string[];
  /** The unique IDs of any meals the dish belongs to */
  mealIds: string[];
  /** (INACTIVE) The ingredients used in the dish */
  ingredients: string[];
  /** The tags applied to the dish */
  tags: Tag[];
}

export interface FilteredDishesGroup {
  type: DishType;
  dishes: Dish[];
  placeholderText?: string;
}

export type DishType = 'main' | 'side' | 'dessert';
