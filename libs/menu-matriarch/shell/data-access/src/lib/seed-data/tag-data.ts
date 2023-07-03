import { TagDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createTagData(
  uid: string,
  ids: SeedDataIds
): Partial<TagDto>[] {
  return [
    {
      id: ids.tagIds.easy,
      uid,
      name: 'Easy',
      dishIds: [ids.dishIds.roastedCauliflower, ids.dishIds.thaiCurry],
    },
    {
      id: ids.tagIds.pescatarian,
      uid,
      name: 'Pescatarian',
      dishIds: [ids.dishIds.salmonBurgers, ids.dishIds.sushi],
      mealIds: [ids.mealIds.sushiDinner],
    },
    {
      id: ids.tagIds.vegan,
      uid,
      name: 'Vegan',
      dishIds: [
        ids.dishIds.misoSoup,
        ids.dishIds.redLentilSoup,
        ids.dishIds.roastedCauliflower,
        ids.dishIds.sweetPotatoFries,
        ids.dishIds.thaiCurry,
      ],
    },
    {
      id: ids.tagIds.vegetarian,
      uid,
      name: 'Vegetarian',
      dishIds: [
        ids.dishIds.cornbread,
        ids.dishIds.greekSalad,
        ids.dishIds.huevosRotos,
        ids.dishIds.macAndCheese,
        ids.dishIds.misoSoup,
        ids.dishIds.pizza,
        ids.dishIds.redLentilSoup,
        ids.dishIds.roastedCauliflower,
        ids.dishIds.sweetPotatoFries,
        ids.dishIds.thaiCurry,
      ],
    },
  ];
}
