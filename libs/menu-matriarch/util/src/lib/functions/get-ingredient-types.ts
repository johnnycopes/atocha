import { IngredientType } from '../ingredient.interface';

export function getIngredientTypes(): IngredientType[] {
  return [
    'bread/bakery',
    'canned/jarred',
    'condiment',
    'dry good',
    'frozen',
    'grocery',
    'meat/seafood',
    'misc',
    'oil',
    'produce',
    'refrigerated',
    'spice',
  ];
}
