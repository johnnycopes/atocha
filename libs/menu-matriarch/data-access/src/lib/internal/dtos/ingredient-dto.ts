import { Ingredient } from '@atocha/menu-matriarch/util';

export type IngredientDto = Ingredient;

export function createIngredientDto({
  id,
  uid,
  name,
  type,
  dishIds,
}: Partial<IngredientDto>): IngredientDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    name: name ?? '',
    type: type ?? 'uncategorized',
    dishIds: dishIds ?? [],
  };
}
