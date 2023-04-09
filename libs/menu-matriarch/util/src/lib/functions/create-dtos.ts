import { DishDto } from '../dish.interface';
import { IngredientDto } from '../ingredient.interface';
import { MealDto } from '../meal.interface';
import { MenuDto } from '../menu.interface';
import { TagDto } from '../tag.interface';
import { UserDto } from '../user.interface';

export function createUserDto({
  uid,
  name,
  email,
  preferences,
}: Partial<UserDto>): UserDto {
  return {
    uid: uid ?? '',
    name: name ?? '',
    email: email ?? '',
    preferences: {
      darkMode: preferences?.darkMode ?? false,
      dayNameDisplay: preferences?.dayNameDisplay ?? 'full',
      defaultMenuStartDay: preferences?.defaultMenuStartDay ?? 'Monday',
      emptyMealText: preferences?.emptyMealText ?? 'undecided',
      mealOrientation: preferences?.mealOrientation ?? 'horizontal',
    },
  };
}

export function createMenuDto({
  id,
  uid,
  name,
  favorited,
  startDay,
  contents,
}: Partial<MenuDto>): MenuDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    name: name ?? '',
    favorited: favorited ?? false,
    startDay: startDay ?? 'Monday',
    contents: contents ?? {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
  };
}

export function createMealDto({
  id,
  uid,
  name,
  description,
  dishIds,
  tagIds,
}: Partial<MealDto>): MealDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    name: name ?? '',
    description: description ?? '',
    dishIds: dishIds ?? [],
    tagIds: tagIds ?? [],
  };
}

export function createIngredientDto({
  id,
  uid,
  name,
  type,
  dishIds,
}: Partial<IngredientDto>): IngredientDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    name: name ?? '',
    type: type ?? 'uncategorized',
    dishIds: dishIds ?? [],
  };
}

export function createDishDto({
  id,
  uid,
  type,
  name,
  favorited,
  description,
  link,
  notes,
  usages,
  menuIds,
  mealIds,
  ingredientIds,
  tagIds,
}: Partial<DishDto>): DishDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    type: type ?? 'main',
    name: name ?? '',
    favorited: favorited ?? false,
    description: description ?? '',
    link: link ?? '',
    notes: notes ?? '',
    usages: usages ?? 0,
    menuIds: menuIds ?? [],
    mealIds: mealIds ?? [],
    ingredientIds: ingredientIds ?? [],
    tagIds: tagIds ?? [],
  };
}

export function createTagDto({
  id,
  uid,
  name,
  color,
  mealIds,
  dishIds,
}: Partial<TagDto>): TagDto {
  return {
    id: id ?? '',
    uid: uid ?? '',
    name: name ?? '',
    color: color ?? '',
    mealIds: mealIds ?? [],
    dishIds: dishIds ?? [],
  };
}
