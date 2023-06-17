export interface Ingredient {
  /** Ingredient's unique ID */
  id: string;
  /** Unique ID of the user associated with the ingredient */
  uid: string;
  /** Display name of the ingredient */
  name: string;
  /** The unique ID of the ingredient type associated with the ingredient */
  typeId: string;
  /** The unique IDs of any dishes the ingredient belongs to */
  dishIds: string[];
}
