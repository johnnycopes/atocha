import { IngredientTypeDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createIngredientTypeData(
  uid: string,
  { ingredientIds, ingredientTypeIds: ingredientTypesIds }: SeedDataIds
): Partial<IngredientTypeDto>[] {
  return [
    {
      id: ingredientTypesIds.bread,
      uid,
      name: 'Bread',
      ingredientIds: [],
    },
    {
      id: ingredientTypesIds.condiment,
      uid,
      name: 'Condiment',
      ingredientIds: [],
    },
    {
      id: ingredientTypesIds.dryGood,
      uid,
      name: 'Dry Good',
      ingredientIds: [],
    },
    {
      id: ingredientTypesIds.frozen,
      uid,
      name: 'Frozen',
      ingredientIds: [],
    },
    {
      id: ingredientTypesIds.meat,
      uid,
      name: 'Meat',
      ingredientIds: [],
    },
    {
      id: ingredientTypesIds.oil,
      uid,
      name: 'Oil',
      ingredientIds: [],
    },
    {
      id: ingredientTypesIds.preserved,
      uid,
      name: 'Preserved',
      ingredientIds: [],
    },
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
      id: ingredientTypesIds.seafood,
      uid,
      name: 'Seafood',
      ingredientIds: [],
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
