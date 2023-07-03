import { UserDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createUserData({
  ids,
  uid,
  name,
  email,
}: {
  ids: SeedDataIds;
  uid: string;
  name: string;
  email: string;
}): Partial<UserDto> {
  return {
    uid: uid,
    name: name,
    email: email,
    preferences: {
      darkMode: false,
      dayNameDisplay: 'full',
      defaultMenuStartDay: 'Monday',
      emptyMealText: 'undecided',
      mealOrientation: 'vertical',
      ingredientTypeOrder: [
        ids.ingredientTypeIds.produce,
        ids.ingredientTypeIds.refrigerated,
        ids.ingredientTypeIds.spice,
      ],
    },
  };
}
