import { trackByFactory } from '@atocha/core/ui';
import {
  Dish,
  FilteredDishesGroup,
  Ingredient,
  MenuEntry,
} from '@atocha/menu-matriarch/util';

export const dishTrackByFn = trackByFactory<Dish>(({ id }) => id);
export const ingredientTrackByFn = trackByFactory<Ingredient>(({ id }) => id);
export const menuEntryTrackByFn = trackByFactory<MenuEntry>(({ day }) => day);
export const groupTrackByFn = trackByFactory<FilteredDishesGroup>(
  ({ type }) => type
);
