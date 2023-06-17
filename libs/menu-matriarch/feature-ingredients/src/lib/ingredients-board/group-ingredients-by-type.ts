import { Ingredient } from '@atocha/menu-matriarch/util';

export function groupIngredientsByType(
  ingredientTypes: string[],
  ingredients: Ingredient[]
): Map<string, Ingredient[]> {
  const map = new Map<string, Ingredient[]>(
    ingredientTypes.map((type) => [type, []])
  );

  for (const ingredient of ingredients) {
    map.get(ingredient.typeId)?.push(ingredient);
  }

  return map;
}
