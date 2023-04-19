import { Ingredient, IngredientType } from '@atocha/menu-matriarch/util';

export function groupIngredientsByType(
  ingredients: Ingredient[]
): Record<IngredientType, Ingredient[]> {
  const record: Record<IngredientType, Ingredient[]> = {
    'bread/bakery': [],
    'canned/jarred good': [],
    condiment: [],
    'dry good': [],
    frozen: [],
    grocery: [],
    'meat/seafood': [],
    oil: [],
    produce: [],
    refrigerated: [],
    spice: [],
    uncategorized: [],
  };

  for (const ingredient of ingredients) {
    record[ingredient.type].push(ingredient);
  }

  return record;
}
