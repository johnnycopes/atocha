import { createMealDto } from '@atocha/menu-matriarch/meals/data-access';
import { SeedDataIds } from './seed-data-ids';

export function createMealData(
  uid: string,
  { dishIds, mealIds, tagIds }: SeedDataIds
) {
  return [
    {
      id: mealIds.mexicanMedley,
      uid,
      name: 'Mexican Medley',
      dishIds: [dishIds.enchiladas, dishIds.guacamole],
    },
    {
      id: mealIds.southernClassic,
      uid,
      name: 'Southern Classic',
      dishIds: [dishIds.cornbread, dishIds.friedChicken, dishIds.macAndCheese],
    },
    {
      id: mealIds.sushiDinner,
      uid,
      name: 'Sushi Dinner',
      dishIds: [dishIds.sushi, dishIds.misoSoup],
      tagIds: [tagIds.pescatarian],
    },
  ].map(createMealDto);
}
