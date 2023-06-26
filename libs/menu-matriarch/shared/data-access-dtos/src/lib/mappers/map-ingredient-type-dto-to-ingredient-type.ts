import { Ingredient, IngredientType } from '@atocha/menu-matriarch/shared/util';
import { IngredientTypeDto } from '../ingredient-type-dto';

export function mapIngredientTypeDtoToIngredientType(
  ingredientTypeDto: IngredientTypeDto,
  ingredients: Ingredient[]
): IngredientType {
  return {
    id: ingredientTypeDto.id,
    uid: ingredientTypeDto.uid,
    name: ingredientTypeDto.name,
    ingredients: ingredients.filter(({ id }) =>
      ingredientTypeDto.ingredientIds.includes(id)
    ),
  };
}
