export interface TagDto {
  id: string;
  uid: string;
  name: string;
  color: string;
  mealIds: string[];
  dishIds: string[];
}

export type Tag = TagDto;

export interface TagModel extends Tag {
  checked: boolean;
}
