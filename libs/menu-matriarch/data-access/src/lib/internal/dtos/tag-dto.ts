import { Tag } from '@atocha/menu-matriarch/util';

export type TagDto = Tag;

export function createTagDto({
  id,
  uid,
  name,
  color,
  mealIds,
  dishIds,
}: Partial<TagDto>): TagDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    name: name ?? '',
    color: color ?? '',
    mealIds: mealIds ?? [],
    dishIds: dishIds ?? [],
  };
}
