import { Dish } from "../dish.interface";
import { Meal, MealDto } from "../meal.interface";
import { Tag } from "../tag.interface";

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
