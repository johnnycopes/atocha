import { Dish } from '@atocha/menu-matriarch/shared/util';

export interface DishDto extends Omit<Dish, 'ingredients' | 'tags'> {
  ingredientIds: string[];
  tagIds: string[];
}

export function createDishDto({
  id,
  uid,
  type,
  name,
  favorited,
  description,
  link,
  notes,
  usages,
  menuIds,
  mealIds,
  ingredientIds,
  tagIds,
}: Partial<DishDto>): DishDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    type: type ?? 'main',
    name: name ?? '',
    favorited: favorited ?? false,
    description: description ?? '',
    link: link ?? '',
    notes: notes ?? '',
    usages: usages ?? 0,
    menuIds: menuIds ?? [],
    mealIds: mealIds ?? [],
    ingredientIds: ingredientIds ?? [],
    tagIds: tagIds ?? [],
  };
}
