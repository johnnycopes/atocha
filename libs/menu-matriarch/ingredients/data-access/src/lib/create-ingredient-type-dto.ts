import { IngredientTypeDto } from './internal/ingredient-type-dto';

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
