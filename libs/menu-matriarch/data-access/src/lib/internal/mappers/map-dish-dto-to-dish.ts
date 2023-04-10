import { Tag, Dish } from '@atocha/menu-matriarch/util';
import { DishDto } from '../dtos/dish-dto';

export function mapDishDtoToDish(dishDto: DishDto, tags: Tag[]): Dish {
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
    ingredients: [],
    tags: tags.filter(({ id }) => dishDto.tagIds.includes(id)),
  };
}