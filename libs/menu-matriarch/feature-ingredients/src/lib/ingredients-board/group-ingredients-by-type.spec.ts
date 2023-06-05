import { Ingredient, IngredientType } from '@atocha/menu-matriarch/util';
import { groupIngredientsByType } from './group-ingredients-by-type';

describe('groupIngredientsByType', () => {
  it('returns a record of ingredients grouped by type', () => {
    const ingredients: Ingredient[] = [
      {
        id: 'ABC',
        uid: '123',
        name: 'Eggs',
        dishIds: ['67'],
        type: 'refrigerated',
      },
      {
        id: 'DEF',
        uid: '123',
        name: 'Garlic',
        dishIds: ['67', '32'],
        type: 'produce',
      },
      {
        id: 'GHI',
        uid: '123',
        name: 'Olive Oil',
        dishIds: ['32'],
        type: 'oil',
      },
      {
        id: 'JKL',
        uid: '123',
        name: 'Onion',
        dishIds: [],
        type: 'produce',
      },
      {
        id: 'MNO',
        uid: '123',
        name: 'Paprika',
        dishIds: ['32'],
        type: 'spice',
      },
      {
        id: 'PQR',
        uid: '123',
        name: 'Pepper',
        dishIds: ['32'],
        type: 'spice',
      },
      {
        id: 'STU',
        uid: '123',
        name: 'Potato',
        dishIds: ['67'],
        type: 'produce',
      },
      {
        id: 'VWX',
        uid: '123',
        name: 'Salt',
        type: 'spice',
        dishIds: [],
      },
    ];

    expect(groupIngredientsByType(ingredients)).toEqual(
      new Map<IngredientType, Ingredient[]>([
        ['bread', []],
        ['condiment', []],
        ['dry good', []],
        ['frozen', []],
        ['grocery', []],
        ['meat', []],
        ['misc', []],
        [
          'oil',
          [
            {
              dishIds: ['32'],
              id: 'GHI',
              name: 'Olive Oil',
              type: 'oil',
              uid: '123',
            },
          ],
        ],
        ['preserved', []],
        [
          'produce',
          [
            {
              dishIds: ['67', '32'],
              id: 'DEF',
              name: 'Garlic',
              type: 'produce',
              uid: '123',
            },
            {
              dishIds: [],
              id: 'JKL',
              name: 'Onion',
              type: 'produce',
              uid: '123',
            },
            {
              dishIds: ['67'],
              id: 'STU',
              name: 'Potato',
              type: 'produce',
              uid: '123',
            },
          ],
        ],
        [
          'refrigerated',
          [
            {
              dishIds: ['67'],
              id: 'ABC',
              name: 'Eggs',
              type: 'refrigerated',
              uid: '123',
            },
          ],
        ],
        ['seafood', []],
        [
          'spice',
          [
            {
              dishIds: ['32'],
              id: 'MNO',
              name: 'Paprika',
              type: 'spice',
              uid: '123',
            },
            {
              dishIds: ['32'],
              id: 'PQR',
              name: 'Pepper',
              type: 'spice',
              uid: '123',
            },
            {
              dishIds: [],
              id: 'VWX',
              name: 'Salt',
              type: 'spice',
              uid: '123',
            },
          ],
        ],
      ])
    );
  });
});
