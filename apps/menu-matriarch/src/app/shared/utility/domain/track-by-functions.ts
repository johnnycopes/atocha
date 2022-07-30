import { Day } from "@models/day.type";
import { FilteredDishesGroup } from "@models/filtered-dishes.interface";
import { trackByFactory } from "../generic/track-by-factory";

export const trackBySelf = trackByFactory<string>(item => item);
export const trackById = trackByFactory<{ id: string }>(item => item.id);
export const trackByDay = trackByFactory<{ day: Day }>(item => item.day);
export const trackByDishType = trackByFactory<FilteredDishesGroup>(({ type }) => type);
