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

export interface IngredientDto {
  id: string;
  uid: string;
  name: string;
  type: IngredientType;
  dishIds: string[];
}

export type Ingredient = IngredientDto;
