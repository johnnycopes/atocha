import { IngredientDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createIngredientData(
  uid: string,
  ids: SeedDataIds
): Partial<IngredientDto>[] {
  return [
    {
      id: ids.ingredientIds.eggs,
      uid,
      name: 'Eggs',
      typeId: ids.ingredientTypesIds.refrigerated,
      dishIds: [ids.dishIds.huevosRotos],
    },
    {
      id: ids.ingredientIds.garlic,
      uid,
      name: 'Garlic',
      typeId: ids.ingredientTypesIds.produce,
      dishIds: [ids.ingredientTypesIds.refrigerated],
    },
    {
      id: ids.ingredientIds.oliveOil,
      uid,
      name: 'Olive Oil',
      typeId: ids.ingredientTypesIds.refrigerated,
      dishIds: [ids.dishIds.huevosRotos],
    },
    {
      id: ids.ingredientIds.onion,
      uid,
      name: 'Onion',
      typeId: ids.ingredientTypesIds.produce,
      dishIds: [ids.ingredientTypesIds.refrigerated],
    },
    {
      id: ids.ingredientIds.paprika,
      uid,
      name: 'Paprika',
      typeId: ids.ingredientTypesIds.spice,
      dishIds: [ids.dishIds.huevosRotos],
    },
    {
      id: ids.ingredientIds.pepper,
      uid,
      name: 'Pepper',
      typeId: ids.ingredientTypesIds.spice,
      dishIds: [ids.dishIds.huevosRotos],
    },
    {
      id: ids.ingredientIds.potato,
      uid,
      name: 'Potato',
      typeId: ids.ingredientTypesIds.produce,
      dishIds: [ids.ingredientTypesIds.refrigerated],
    },
    {
      id: ids.ingredientIds.salt,
      uid,
      name: 'Salt',
      typeId: ids.ingredientTypesIds.spice,
      dishIds: [ids.dishIds.huevosRotos],
    },
  ];
}
