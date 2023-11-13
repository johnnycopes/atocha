import { createUserDto } from '@atocha/menu-matriarch/settings/data-access';
import { SeedDataIds } from './seed-data-ids';

export function createUserData({
  ids: { ingredientTypeIds },
  uid,
  name,
  email,
}: {
  ids: SeedDataIds;
  uid: string;
  name: string;
  email: string;
}) {
  return createUserDto({
    uid,
    name,
    email,
    preferences: {
      darkMode: false,
      dayNameDisplay: 'full',
      defaultMenuStartDay: 'Monday',
      emptyMealText: 'undecided',
      mealOrientation: 'vertical',
      ingredientTypeOrder: [
        ingredientTypeIds.bread,
        ingredientTypeIds.condiment,
        ingredientTypeIds.dryGood,
        ingredientTypeIds.frozen,
        ingredientTypeIds.meat,
        ingredientTypeIds.oil,
        ingredientTypeIds.preserved,
        ingredientTypeIds.produce,
        ingredientTypeIds.refrigerated,
        ingredientTypeIds.seafood,
        ingredientTypeIds.spice,
      ],
    },
  });
}
