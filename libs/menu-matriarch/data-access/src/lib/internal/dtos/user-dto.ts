import { User } from '@atocha/menu-matriarch/util';

export type UserDto = User;

export function createUserDto({
  uid,
  name,
  email,
  preferences,
}: Partial<UserDto>): UserDto {
  return {
    uid: uid ?? '',
    name: name ?? '',
    email: email ?? '',
    preferences: {
      darkMode: preferences?.darkMode ?? false,
      dayNameDisplay: preferences?.dayNameDisplay ?? 'full',
      defaultMenuStartDay: preferences?.defaultMenuStartDay ?? 'Monday',
      emptyMealText: preferences?.emptyMealText ?? 'undecided',
      mealOrientation: preferences?.mealOrientation ?? 'horizontal',
      ingredientTypeOrder: preferences?.ingredientTypeOrder ?? {
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
      },
    },
  };
}
