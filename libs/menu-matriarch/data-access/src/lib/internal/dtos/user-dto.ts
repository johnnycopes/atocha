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
        'bread/bakery': 1,
        'canned/jarred good': 2,
        condiment: 3,
        'dry good': 4,
        frozen: 5,
        grocery: 6,
        'meat/seafood': 7,
        oil: 8,
        produce: 9,
        refrigerated: 10,
        spice: 11,
        uncategorized: 12,
      },
    },
  };
}
