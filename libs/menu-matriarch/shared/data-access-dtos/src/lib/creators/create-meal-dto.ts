import { MealDto } from '../meal-dto';

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
