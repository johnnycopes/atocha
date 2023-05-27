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

export type IngredientType = IngredientTypes[number];

type IngredientTypes = typeof INGREDIENT_TYPES;

const INGREDIENT_TYPES = [
  'bread',
  'condiment',
  'dry good',
  'frozen',
  'grocery',
  'meat',
  'misc',
  'oil',
  'preserved',
  'produce',
  'refrigerated',
  'seafood',
  'spice',
] as const;
