import { MealDto } from '@atocha/menu-matriarch/shared/data-access';
import { Dish, Tag, Meal } from '@atocha/menu-matriarch/shared/util';

export function mapMealDtoToMeal({
  mealDto,
  dishes,
  tags,
}: {
  mealDto: MealDto;
  dishes: Dish[];
  tags: Tag[];
}): Meal {
  return {
    id: mealDto.id,
    uid: mealDto.uid,
    name: mealDto.name,
    description: mealDto.description,
    dishes: dishes.filter(({ id }) => mealDto.dishIds.includes(id)),
    tags: tags.filter(({ id }) => mealDto.tagIds.includes(id)),
  };
}
