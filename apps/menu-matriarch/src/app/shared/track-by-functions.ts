import { trackByFactory } from '@atocha/core/ui';
import { Dish, FilteredDishesGroup, MenuEntry } from '@atocha/menu-matriarch/types';

export const dishTrackByFn = trackByFactory<Dish>(({ id }) => id);
export const menuEntryTrackByFn = trackByFactory<MenuEntry>(({ day }) => day);
export const groupTrackByFn = trackByFactory<FilteredDishesGroup>(
  ({ type }) => type
);
