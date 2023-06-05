import { IngredientType } from '@atocha/menu-matriarch/util';

export type IngredientTypeDto = IngredientType;

export function createIngredientTypeDto({
  id,
  uid,
  name,
  ingredientIds,
}: Partial<IngredientTypeDto>): IngredientTypeDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    name: name ?? '',
    ingredientIds: ingredientIds ?? [],
  };
}
