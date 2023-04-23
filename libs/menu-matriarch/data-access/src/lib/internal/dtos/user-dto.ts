import { User, getIngredientTypes } from '@atocha/menu-matriarch/util';

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
      ingredientTypeOrder:
        preferences?.ingredientTypeOrder ?? getIngredientTypes(),
    },
  };
}
