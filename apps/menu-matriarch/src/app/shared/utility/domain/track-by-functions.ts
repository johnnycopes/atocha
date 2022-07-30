import { trackByFactory } from "../generic/track-by-factory";
import { FilteredDishesGroup } from "@models/filtered-dishes.interface";
import { MenuEntry } from "@models/menu-entry.interface";

export const trackBySelf = trackByFactory<string>(item => item);
export const trackById = trackByFactory<{ id: string }>(item => item.id);
export const entryTrackBy = trackByFactory<MenuEntry>(({ day }) => day);
export const groupTrackBy = trackByFactory<FilteredDishesGroup>(({ type }) => type);
