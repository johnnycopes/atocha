import { MealDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createMealData(
  uid: string,
  ids: SeedDataIds
): Partial<MealDto>[] {
  return [
    {
      id: ids.mealIds.southernClassic,
      uid,
      name: 'Southern Classic',
      dishIds: [
        ids.dishIds.cornbread,
        ids.dishIds.friedChicken,
        ids.dishIds.macAndCheese,
      ],
    },
    {
      id: ids.mealIds.sushiDinner,
      uid,
      name: 'Sushi Dinner',
      dishIds: [ids.dishIds.sushi, ids.dishIds.misoSoup],
      tagIds: [ids.tagIds.pescatarian],
    },
  ];
}
