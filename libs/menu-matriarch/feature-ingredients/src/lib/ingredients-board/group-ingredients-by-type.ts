import {
  Ingredient,
  IngredientType,
  getIngredientTypes,
} from '@atocha/menu-matriarch/util';

export function groupIngredientsByType(
  ingredients: Ingredient[]
): Map<IngredientType, Ingredient[]> {
  const map = new Map<IngredientType, Ingredient[]>(
    getIngredientTypes().map((type) => [type, []])
  );

  for (const ingredient of ingredients) {
    map.get(ingredient.type)?.push(ingredient);
  }

  return map;
}
