import { MealDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createMealData(
  uid: string,
  { dishIds, mealIds, tagIds }: SeedDataIds
): Partial<MealDto>[] {
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
  ];
}
