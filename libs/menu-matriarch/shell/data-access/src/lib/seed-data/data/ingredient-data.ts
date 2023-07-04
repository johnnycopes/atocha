import { IngredientDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createIngredientData(
  uid: string,
  { dishIds, ingredientIds, ingredientTypeIds: ingredientTypesIds }: SeedDataIds
): Partial<IngredientDto>[] {
  return [
    {
      id: ingredientIds.adobo,
      uid,
      name: 'Adobo',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.basil,
      uid,
      name: 'Basil',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.bayLeaves,
      uid,
      name: 'Bay Leaves',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.cardamom,
      uid,
      name: 'Cardamom',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.chiliPowder,
      uid,
      name: 'Chili Powder',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.chives,
      uid,
      name: 'Chives',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.cinnamon,
      uid,
      name: 'Cinnamon',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.coriander,
      uid,
      name: 'Coriander',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.coriander,
      uid,
      name: 'Coriander',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.crushedRedPepper,
      uid,
      name: 'Crushed Red Pepper',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.cumin,
      uid,
      name: 'Cumin',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.eggs,
      uid,
      name: 'Eggs',
      typeId: ingredientTypesIds.refrigerated,
      dishIds: [dishIds.huevosRotos],
    },
    {
      id: ingredientIds.garlic,
      uid,
      name: 'Garlic',
      typeId: ingredientTypesIds.produce,
      dishIds: [dishIds.huevosRotos],
    },
    {
      id: ingredientIds.garlicPowder,
      uid,
      name: 'Garlic Powder',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.nutmeg,
      uid,
      name: 'Nutmeg',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.oliveOil,
      uid,
      name: 'Olive Oil',
      typeId: ingredientTypesIds.refrigerated,
      dishIds: [dishIds.huevosRotos],
    },
    {
      id: ingredientIds.onion,
      uid,
      name: 'Onion',
      typeId: ingredientTypesIds.produce,
      dishIds: [dishIds.huevosRotos],
    },
    {
      id: ingredientIds.oregano,
      uid,
      name: 'Oregano',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.paprika,
      uid,
      name: 'Paprika',
      typeId: ingredientTypesIds.spice,
      dishIds: [dishIds.huevosRotos],
    },
    {
      id: ingredientIds.parsley,
      uid,
      name: 'Parsley',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.pepper,
      uid,
      name: 'Pepper',
      typeId: ingredientTypesIds.spice,
      dishIds: [dishIds.huevosRotos],
    },
    {
      id: ingredientIds.potato,
      uid,
      name: 'Potato',
      typeId: ingredientTypesIds.produce,
      dishIds: [dishIds.huevosRotos],
    },
    {
      id: ingredientIds.sage,
      uid,
      name: 'Sage',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.salt,
      uid,
      name: 'Salt',
      typeId: ingredientTypesIds.spice,
      dishIds: [dishIds.huevosRotos],
    },
    {
      id: ingredientIds.thyme,
      uid,
      name: 'Thyme',
      typeId: ingredientTypesIds.spice,
    },
    {
      id: ingredientIds.turmeric,
      uid,
      name: 'Turmeric',
      typeId: ingredientTypesIds.spice,
    },
  ];
}
