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

export type IngredientType =
  | 'bread/bakery'
  | 'condiment'
  | 'canned/jarred good'
  | 'dry good'
  | 'frozen'
  | 'grocery'
  | 'meat/seafood'
  | 'oil'
  | 'produce'
  | 'refrigerated'
  | 'spice'
  | 'uncategorized';
