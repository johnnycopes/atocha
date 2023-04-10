export interface Ingredient {
  id: string;
  uid: string;
  name: string;
  type: IngredientType;
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
