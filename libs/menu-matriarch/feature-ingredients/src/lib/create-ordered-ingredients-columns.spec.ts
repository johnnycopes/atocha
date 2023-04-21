import { createOrderedIngredientsColumns } from './create-ordered-ingredients-columns';

describe('createOrderedIngredientsColumns', () => {
  it('returns correctly ordered columns', () => {
    expect(
      createOrderedIngredientsColumns({
        'bread/bakery': 0,
        'canned/jarred good': 1,
        condiment: 2,
        'dry good': 3,
        frozen: 4,
        grocery: 5,
        'meat/seafood': 6,
        oil: 7,
        produce: 8,
        refrigerated: 9,
        spice: 10,
        uncategorized: 11,
      })
    ).toEqual([
      { name: 'bread/bakery', ingredients: [] },
      { name: 'canned/jarred good', ingredients: [] },
      { name: 'condiment', ingredients: [] },
      { name: 'dry good', ingredients: [] },
      { name: 'frozen', ingredients: [] },
      { name: 'grocery', ingredients: [] },
      { name: 'meat/seafood', ingredients: [] },
      { name: 'oil', ingredients: [] },
      { name: 'produce', ingredients: [] },
      { name: 'refrigerated', ingredients: [] },
      { name: 'spice', ingredients: [] },
      { name: 'uncategorized', ingredients: [] },
    ]);
  });
});
