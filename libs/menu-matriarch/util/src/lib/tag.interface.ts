export interface Tag {
  id: string;
  uid: string;
  name: string;
  color: string;
  mealIds: string[];
  dishIds: string[];
}

export type TagDto = Tag;

export interface TagModel extends Tag {
  checked: boolean;
}
