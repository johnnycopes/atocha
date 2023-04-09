import { createUserDto } from './user-dto';

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
        mealOrientation: 'horizontal',
      },
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
        mealOrientation: 'vertical',
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
        mealOrientation: 'vertical',
      },
    });
  });
});
