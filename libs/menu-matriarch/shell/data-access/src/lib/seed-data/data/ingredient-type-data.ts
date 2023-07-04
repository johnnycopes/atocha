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
      ingredientIds: [ingredientIds.oliveOil],
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
        ingredientIds.adobo,
        ingredientIds.basil,
        ingredientIds.bayLeaves,
        ingredientIds.cardamom,
        ingredientIds.cayennePepper,
        ingredientIds.chiliPowder,
        ingredientIds.chives,
        ingredientIds.cinnamon,
        ingredientIds.coriander,
        ingredientIds.crushedRedPepper,
        ingredientIds.cumin,
        ingredientIds.garlicPowder,
        ingredientIds.nutmeg,
        ingredientIds.oregano,
        ingredientIds.paprika,
        ingredientIds.parsley,
        ingredientIds.pepper,
        ingredientIds.sage,
        ingredientIds.salt,
        ingredientIds.thyme,
        ingredientIds.turmeric,
      ],
    },
  ];
}
