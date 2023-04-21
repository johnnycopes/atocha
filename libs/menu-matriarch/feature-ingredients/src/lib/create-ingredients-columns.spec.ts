import { createIngredientsColumns } from './create-ingredients-columns';

describe('createIngredientsColumns', () => {
  it('returns correctly ordered columns', () => {
    expect(
      createIngredientsColumns(
        [
          {
            dishIds: ['67'],
            id: 'ABC',
            name: 'Eggs',
            type: 'refrigerated',
            uid: '123',
          },
          {
            dishIds: ['67', '32'],
            id: 'DEF',
            name: 'Garlic',
            type: 'produce',
            uid: '123',
          },
          {
            dishIds: ['32'],
            id: 'GHI',
            name: 'Olive Oil',
            type: 'oil',
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
          {
            dishIds: ['67'],
            id: 'STU',
            name: 'Potato',
            type: 'produce',
            uid: '123',
          },
        ],
        {
          'bread/bakery': 7,
          'canned/jarred good': 5,
          condiment: 2,
          'dry good': 3,
          frozen: 1,
          grocery: 4,
          'meat/seafood': 6,
          oil: 11,
          produce: 0,
          refrigerated: 9,
          spice: 8,
          uncategorized: 10,
        }
      )
    ).toEqual([
      {
        name: 'produce',
        ingredients: [
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
      },
      { name: 'frozen', ingredients: [] },
      { name: 'condiment', ingredients: [] },
      { name: 'dry good', ingredients: [] },
      { name: 'grocery', ingredients: [] },
      { name: 'canned/jarred good', ingredients: [] },
      { name: 'meat/seafood', ingredients: [] },
      { name: 'bread/bakery', ingredients: [] },
      {
        name: 'spice',
        ingredients: [
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
      },
      {
        name: 'refrigerated',
        ingredients: [
          {
            dishIds: ['67'],
            id: 'ABC',
            name: 'Eggs',
            type: 'refrigerated',
            uid: '123',
          },
        ],
      },
      { name: 'uncategorized', ingredients: [] },
      {
        name: 'oil',
        ingredients: [
          {
            dishIds: ['32'],
            id: 'GHI',
            name: 'Olive Oil',
            type: 'oil',
            uid: '123',
          },
        ],
      },
    ]);
  });
});
