import { IngredientTypeDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createIngredientTypeData(
  uid: string,
  ids: SeedDataIds
): Partial<IngredientTypeDto>[] {
  return [
    {
      id: ids.ingredientTypesIds.produce,
      uid,
      name: 'Produce',
      ingredientIds: [
        ids.ingredientIds.garlic,
        ids.ingredientIds.onion,
        ids.ingredientIds.potato,
      ],
    },
    {
      id: ids.ingredientTypesIds.refrigerated,
      uid,
      name: 'Refrigerated',
      ingredientIds: [ids.ingredientIds.eggs, ids.ingredientIds.oliveOil],
    },
    {
      id: ids.ingredientTypesIds.spice,
      uid,
      name: 'Spice',
      ingredientIds: [
        ids.ingredientIds.paprika,
        ids.ingredientIds.pepper,
        ids.ingredientIds.salt,
      ],
    },
  ];
}
