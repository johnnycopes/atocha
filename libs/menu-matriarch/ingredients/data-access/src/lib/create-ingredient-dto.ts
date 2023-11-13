import { IngredientDto } from './internal/ingredient-dto';

export function createIngredientDto({
  id,
  uid,
  name,
  typeId,
  dishIds,
}: Partial<IngredientDto>): IngredientDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    name: name ?? '',
    typeId: typeId ?? '',
    dishIds: dishIds ?? [],
  };
}
