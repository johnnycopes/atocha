import { createOrderedIngredientsColumns } from './create-ordered-ingredients-columns';

describe('createOrderedIngredientsColumns', () => {
  it('returns correctly ordered columns', () => {
    expect(
      createOrderedIngredientsColumns({
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
      })
    ).toEqual([
      { name: 'produce', ingredients: [] },
      { name: 'frozen', ingredients: [] },
      { name: 'condiment', ingredients: [] },
      { name: 'dry good', ingredients: [] },
      { name: 'grocery', ingredients: [] },
      { name: 'canned/jarred good', ingredients: [] },
      { name: 'meat/seafood', ingredients: [] },
      { name: 'bread/bakery', ingredients: [] },
      { name: 'spice', ingredients: [] },
      { name: 'refrigerated', ingredients: [] },
      { name: 'uncategorized', ingredients: [] },
      { name: 'oil', ingredients: [] },
    ]);
  });
});
