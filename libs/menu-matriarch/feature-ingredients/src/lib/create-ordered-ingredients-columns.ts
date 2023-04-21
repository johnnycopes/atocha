import { Ingredient, IngredientType } from '@atocha/menu-matriarch/util';
import { IngredientColumn } from './ingredients-board/ingredients-board.component';

export function createOrderedIngredientsColumns(
  ordersRecord: Record<IngredientType, number>
): IngredientColumn[] {
  const columns: IngredientColumn[] = [];

  for (const type in ordersRecord) {
    const typedType = type as IngredientType;
    columns[ordersRecord[typedType]] = {
      name: typedType,
      ingredients: new Array<Ingredient>(),
    };
  }

  return columns;
}
