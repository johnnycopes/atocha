import { Tag, Dish, Ingredient } from '@atocha/menu-matriarch/shared/util';
import { DishDto } from '../../../../data-access-dtos/src/lib/dtos/dish-dto';

export function mapDishDtoToDish(
  dishDto: DishDto,
  ingredients: Ingredient[],
  tags: Tag[]
): Dish {
  return {
    id: dishDto.id,
    uid: dishDto.uid,
    name: dishDto.name,
    description: dishDto.description,
    favorited: dishDto.favorited,
    link: dishDto.link,
    notes: dishDto.notes,
    type: dishDto.type,
    usages: dishDto.usages,
    mealIds: dishDto.mealIds,
    menuIds: dishDto.menuIds,
    ingredients: ingredients.filter(({ id }) =>
      dishDto.ingredientIds.includes(id)
    ),
    tags: tags.filter(({ id }) => dishDto.tagIds.includes(id)),
  };
}
