import { DishType } from "@atocha/menu-matriarch/types";

export function getDishTypes(): readonly DishType[] {
  return ['main', 'side', 'dessert'];
}
