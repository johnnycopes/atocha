import { IngredientType } from '@atocha/menu-matriarch/shared/util';

export interface IngredientTypeDto extends Omit<IngredientType, 'ingredients'> {
  ingredientIds: string[];
}
