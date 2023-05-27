import { IngredientType } from '../ingredient.interface';

export function getIngredientTypes(): IngredientType[] {
  return [
    'bread',
    'condiment',
    'dry good',
    'frozen',
    'grocery',
    'meat',
    'misc',
    'oil',
    'preserved',
    'produce',
    'refrigerated',
    'seafood',
    'spice',
  ];
}
