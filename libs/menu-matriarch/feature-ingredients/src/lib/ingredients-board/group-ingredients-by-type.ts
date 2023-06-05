import { Ingredient, getIngredientTypes } from '@atocha/menu-matriarch/util';

export function groupIngredientsByType(
  ingredients: Ingredient[]
): Map<string, Ingredient[]> {
  const map = new Map<string, Ingredient[]>(
    getIngredientTypes().map((type) => [type, []])
  );

  for (const ingredient of ingredients) {
    map.get(ingredient.type)?.push(ingredient);
  }

  return map;
}
