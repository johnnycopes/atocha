import { Ingredient } from './ingredient.interface';

export interface IngredientType {
  /** Ingredient's unique ID */
  id: string;
  /** Unique ID of the user associated with the ingredient */
  uid: string;
  /** Display name of the ingredient */
  name: string;
  /** The unique IDs of any ingredients classified as the type */
  ingredients: Ingredient[];
}
