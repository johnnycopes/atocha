/* eslint-disable @typescript-eslint/no-unused-vars */

import { MenuDto } from './menu-dto';
import { MealDto } from './meal-dto';
import { DishDto } from './dish-dto';
import { IngredientDto } from './ingredient-dto';
import { TagDto } from './tag-dto';
import { UserDto } from './user-dto';

/**
 * This interface documents the database schema and is intentionally not exported
 */
interface DatabaseSchema {
  menus: MenuDto[];
  meals: MealDto[];
  dishes: DishDto[];
  ingredients: IngredientDto;
  tags: TagDto[];
  users: UserDto[];
}
