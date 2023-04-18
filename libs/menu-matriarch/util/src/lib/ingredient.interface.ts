export interface Ingredient {
  /** Ingredient's unique ID */
  id: string;
  /** Unique ID of the user associated with the ingredient */
  uid: string;
  /** Display name of the ingredient */
  name: string;
  /** Category of ingredient */
  type: IngredientType;
  /** The unique IDs of any dishes the ingredient belongs to */
  dishIds: string[];
}

export const INGREDIENT_TYPES = [
  'bread/bakery',
  'condiment',
  'canned/jarred good',
  'dry good',
  'frozen',
  'grocery',
  'meat/seafood',
  'oil',
  'produce',
  'refrigerated',
  'spice',
  'uncategorized',
] as const;

export type IngredientTypes = typeof INGREDIENT_TYPES;
export type IngredientType = IngredientTypes[number];
