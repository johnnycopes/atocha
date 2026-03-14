import { createDishDto } from './create-dish-dto';

describe('createDishDto', () => {
  it('creates default dish when no arguments are passed in', () => {
    const dish = createDishDto({});
    expect(dish).toStrictEqual({
      id: '',
      uid: '',
      type: 'main',
      name: '',
      favorited: false,
      description: '',
      link: '',
      notes: '',
      usages: 0,
      menuIds: [],
      mealIds: [],
      ingredientIds: [],
      tagIds: [],
    });
  });

  it('creates menu when arguments are passed in', () => {
    const dish = createDishDto({
      id: '1',
      uid: '2A',
      name: 'Macaroni and Cheese',
      description: 'Delicious baked noodles',
      favorited: true,
      type: 'side',
      link: 'https://cooking.nytimes.com/recipes/1015825-creamy-macaroni-and-cheese',
      notes: 'Wow so good',
      menuIds: ['4'],
      mealIds: ['14', '34'],
      ingredientIds: ['29'],
      tagIds: ['9'],
      usages: 1,
    });
    expect(dish).toStrictEqual({
      id: '1',
      uid: '2A',
      name: 'Macaroni and Cheese',
      description: 'Delicious baked noodles',
      favorited: true,
      type: 'side',
      link: 'https://cooking.nytimes.com/recipes/1015825-creamy-macaroni-and-cheese',
      notes: 'Wow so good',
      menuIds: ['4'],
      mealIds: ['14', '34'],
      ingredientIds: ['29'],
      tagIds: ['9'],
      usages: 1,
    });
  });
});
