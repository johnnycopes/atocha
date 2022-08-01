import { DishType } from "../dish.interface";

export function getDishTypes(): readonly DishType[] {
  return ['main', 'side', 'dessert'];
}
