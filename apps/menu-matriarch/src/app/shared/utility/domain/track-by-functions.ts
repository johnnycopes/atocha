import { trackByFactory } from "../generic/track-by-factory";
import { FilteredDishesGroup } from "@models/filtered-dishes.interface";
import { MenuEntry } from "@models/menu-entry.interface";
import { Dish } from "@models/dish.interface";

export const trackBySelf = trackByFactory<string>(item => item);
export const dishTrackByFn = trackByFactory<Dish>(({ id }) => id);
export const menuEntryTrackByFn = trackByFactory<MenuEntry>(({ day }) => day);
export const groupTrackByFn = trackByFactory<FilteredDishesGroup>(({ type }) => type);
