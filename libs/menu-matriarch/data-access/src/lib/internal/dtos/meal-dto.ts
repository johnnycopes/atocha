import { Meal } from '@atocha/menu-matriarch/util';

export interface MealDto extends Omit<Meal, 'dishes' | 'tags'> {
  dishIds: string[];
  tagIds: string[];
}

export function createMealDto({
  id,
  uid,
  name,
  description,
  dishIds,
  tagIds,
}: Partial<MealDto>): MealDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    name: name ?? '',
    description: description ?? '',
    dishIds: dishIds ?? [],
    tagIds: tagIds ?? [],
  };
}
