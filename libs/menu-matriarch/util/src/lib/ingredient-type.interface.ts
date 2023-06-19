import { Ingredient } from './ingredient.interface';

export interface IngredientType {
  /** Ingredient type's unique ID */
  id: string;
  /** Unique ID of the user associated with the ingredient type */
  uid: string;
  /** Display name of the ingredient type */
  name: string;
  /** The ingredients classified as the ingredient type */
  ingredients: Ingredient[];
}
