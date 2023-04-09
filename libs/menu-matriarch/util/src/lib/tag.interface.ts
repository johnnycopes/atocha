/** A customizable tag that can be applied to any number of dishes
 * and/or meals in order to allow easier filtering when browsing
 */
export interface Tag {
  /** Tag's unique ID */
  id: string;
  /** Unique ID of the user associated with the tag */
  uid: string;
  /** Display name of the tag */
  name: string;
  /** (INACTIVE) Color of the tag */
  color: string;
  /** The unique IDs of the meals the tag is applied to */
  mealIds: string[];
  /** The unique IDs of the dishes the tag is applied to */
  dishIds: string[];
}

export interface TagModel extends Tag {
  checked: boolean;
}
