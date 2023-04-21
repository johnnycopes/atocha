import { IngredientType } from '@atocha/menu-matriarch/util';
import { IngredientColumn } from './ingredients-board/ingredients-board.component';

export function createOrderedIngredientsColumns(
  ordersRecord: Record<IngredientType, number>
): IngredientColumn[] {
  const orders = Object.entries(ordersRecord);
  const columns: IngredientColumn[] = [];

  for (const [type, position] of orders) {
    columns[position] = { name: type as IngredientType, ingredients: [] };
  }

  return columns;
}
