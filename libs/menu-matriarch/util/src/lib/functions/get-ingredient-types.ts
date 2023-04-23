import { IngredientType } from '../ingredient.interface';

export function getIngredientTypes(): IngredientType[] {
  return [
    'bread/bakery',
    'canned/jarred good',
    'condiment',
    'dry good',
    'frozen',
    'grocery',
    'meat/seafood',
    'oil',
    'produce',
    'refrigerated',
    'spice',
    'uncategorized',
  ];
}
