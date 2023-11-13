import { createTagDto } from '@atocha/menu-matriarch/tags/data-access';
import { SeedDataIds } from './seed-data-ids';

export function createTagData(
  uid: string,
  { dishIds, mealIds, tagIds }: SeedDataIds
) {
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
  ].map(createTagDto);
}
