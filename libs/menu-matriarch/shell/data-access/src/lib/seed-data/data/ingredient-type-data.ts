import { IngredientTypeDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createIngredientTypeData(
  uid: string,
  { ingredientIds, ingredientTypeIds: ingredientTypesIds }: SeedDataIds
): Partial<IngredientTypeDto>[] {
  return [
    {
      id: ingredientTypesIds.produce,
      uid,
      name: 'Produce',
      ingredientIds: [
        ingredientIds.garlic,
        ingredientIds.onion,
        ingredientIds.potato,
      ],
    },
    {
      id: ingredientTypesIds.refrigerated,
      uid,
      name: 'Refrigerated',
      ingredientIds: [ingredientIds.eggs, ingredientIds.oliveOil],
    },
    {
      id: ingredientTypesIds.spice,
      uid,
      name: 'Spice',
      ingredientIds: [
        ingredientIds.paprika,
        ingredientIds.pepper,
        ingredientIds.salt,
      ],
    },
  ];
}
