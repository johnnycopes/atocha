import { createDishDto, createMealDto, createMenuDto, createTagDto, createUserDto } from "./create-dtos";

describe('createDtos', () => {
  describe('createUserDto', () => {
    it('creates default user when no arguments are passed in', () => {
      const user = createUserDto({});
      expect(user).toEqual({
        uid: '',
        name: '',
        email: '',
        preferences: {
          darkMode: false,
          dayNameDisplay: 'full',
          defaultMenuStartDay: 'Monday',
          emptyMealText: 'undecided',
          mealOrientation: 'horizontal'
        }
      });
    });

    it('creates user when arguments are passed in', () => {
      const user = createUserDto({
        uid: '1',
        email: 'fake@fake.com',
        name: 'Bob',
        preferences: {
          darkMode: true,
          dayNameDisplay: 'full',
          defaultMenuStartDay: 'Wednesday',
          emptyMealText: 'nothing',
          mealOrientation: 'vertical'
        },
      });
      expect(user).toEqual({
        uid: '1',
        email: 'fake@fake.com',
        name: 'Bob',
        preferences: {
          darkMode: true,
          dayNameDisplay: 'full',
          defaultMenuStartDay: 'Wednesday',
          emptyMealText: 'nothing',
          mealOrientation: 'vertical'
        },
      });
    });
  });

  describe('createMenuDto', () => {
    it('creates default menu when no arguments are passed in', () => {
      const menu = createMenuDto({});
      expect(menu).toEqual({
        contents: {
          Friday: [],
          Monday: [],
          Saturday: [],
          Sunday: [],
          Thursday: [],
          Tuesday: [],
          Wednesday: [],
        },
        favorited: false,
        id: '',
        name: '',
        startDay: 'Monday',
        uid: '',
      });
    });

    it('creates menu when arguments are passed in', () => {
      const menu = createMenuDto({
        id: '1',
        uid: 'A2',
        name: 'Bob',
        favorited: true,
        startDay: 'Saturday',
        contents: {
          Monday: [], Tuesday: ['1'], Wednesday: [], Thursday: ['2'], Friday: [], Saturday: [], Sunday: ['3']
        },
      });
      expect(menu).toEqual({
        id: '1',
        uid: 'A2',
        name: 'Bob',
        favorited: true,
        startDay: 'Saturday',
        contents: {
          Monday: [], Tuesday: ['1'], Wednesday: [], Thursday: ['2'], Friday: [], Saturday: [], Sunday: ['3'],
        }
      });
    });
  });

  describe('createMealDto', () => {
    it('creates default meal when no arguments are passed in', () => {
      const meal = createMealDto({});
      expect(meal).toEqual({
        description: '',
        dishIds: [],
        id: '',
        name: '',
        tagIds: [],
        uid: '',
      });
    });

    it('creates menu when arguments are passed in', () => {
      const meal = createMealDto({
        description: 'Very tasty',
        dishIds: ['1', '2'],
        id: '3A',
        name: 'Southern Classic',
        tagIds: ['10'],
        uid: '1',
      });
      expect(meal).toEqual({
        description: 'Very tasty',
        dishIds: ['1', '2'],
        id: '3A',
        name: 'Southern Classic',
        tagIds: ['10'],
        uid: '1',
      });
    });
  });

  describe('createDishDto', () => {
    it('creates default dish when no arguments are passed in', () => {
      const dish = createDishDto({});
      expect(dish).toEqual({
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
      expect(dish).toEqual({
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

  describe('createTagDto', () => {
    it('creates default tag when no arguments are passed in', () => {
      const tag = createTagDto({});
      expect(tag).toEqual({
        id: '',
        uid: '',
        name: '',
        color: '',
        mealIds: [],
        dishIds: [],
      });
    });

    it('creates tag when arguments are passed in', () => {
      const tag = createTagDto({
        id: '1',
        uid: '7R',
        name: 'Pescatarian',
        color: 'cadetblue',
        dishIds: ['8', '9'],
        mealIds: ['10'],
      });
      expect(tag).toEqual({
        id: '1',
        uid: '7R',
        name: 'Pescatarian',
        color: 'cadetblue',
        dishIds: ['8', '9'],
        mealIds: ['10'],
      });
    });
  });
});
