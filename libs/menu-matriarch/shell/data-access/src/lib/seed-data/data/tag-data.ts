import { TagDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createTagData(
  uid: string,
  { dishIds, mealIds, tagIds }: SeedDataIds
): Partial<TagDto>[] {
  return [
    {
      id: tagIds.easy,
      uid,
      name: 'Easy',
      dishIds: [
        dishIds.guacamole,
        dishIds.roastedCauliflower,
        dishIds.thaiCurry,
      ],
    },
    {
      id: tagIds.pescatarian,
      uid,
      name: 'Pescatarian',
      dishIds: [dishIds.salmonBurgers, dishIds.sushi],
      mealIds: [mealIds.sushiDinner],
    },
    {
      id: tagIds.vegan,
      uid,
      name: 'Vegan',
      dishIds: [
        dishIds.guacamole,
        dishIds.misoSoup,
        dishIds.redLentilSoup,
        dishIds.roastedCauliflower,
        dishIds.sweetPotatoFries,
        dishIds.thaiCurry,
      ],
    },
    {
      id: tagIds.vegetarian,
      uid,
      name: 'Vegetarian',
      dishIds: [
        dishIds.cornbread,
        dishIds.greekSalad,
        dishIds.guacamole,
        dishIds.huevosRotos,
        dishIds.macAndCheese,
        dishIds.misoSoup,
        dishIds.pizza,
        dishIds.redLentilSoup,
        dishIds.roastedCauliflower,
        dishIds.sweetPotatoFries,
        dishIds.thaiCurry,
      ],
    },
  ];
}
