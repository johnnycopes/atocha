import { IngredientDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createIngredientData(
  uid: string,
  { dishIds, ingredientIds, ingredientTypeIds: ingredientTypesIds }: SeedDataIds
): Partial<IngredientDto>[] {
  return [
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
      id: ingredientIds.paprika,
      uid,
      name: 'Paprika',
      typeId: ingredientTypesIds.spice,
      dishIds: [dishIds.huevosRotos],
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
      id: ingredientIds.salt,
      uid,
      name: 'Salt',
      typeId: ingredientTypesIds.spice,
      dishIds: [dishIds.huevosRotos],
    },
  ];
}
