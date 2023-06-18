import { IngredientType } from '@atocha/menu-matriarch/util';

export interface IngredientTypeDto extends Omit<IngredientType, 'ingredients'> {
  ingredientIds: string[];
}

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
