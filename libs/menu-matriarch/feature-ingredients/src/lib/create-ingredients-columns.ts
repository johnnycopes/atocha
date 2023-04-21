import { Ingredient, IngredientType } from '@atocha/menu-matriarch/util';
import { IngredientColumn } from './ingredients-board/ingredients-board.component';

export function createIngredientsColumns(
  ingredients: Ingredient[],
  order: Record<IngredientType, number>
): IngredientColumn[] {
  const ingredientsByType: Record<IngredientType, Ingredient[]> = {
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
    ingredientsByType[ingredient.type].push(ingredient);
  }

  const columns: IngredientColumn[] = [];

  for (const key in order) {
    const type = key as IngredientType;
    const position = order[type];

    columns[position] = {
      name: type,
      ingredients: ingredientsByType[type],
    };
  }

  return columns;
}
