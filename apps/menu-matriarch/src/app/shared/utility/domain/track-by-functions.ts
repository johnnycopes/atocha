import { Day } from "@models/day.type";
import { DishType } from "@models/dish-type.type";
import { trackByFactory } from "../generic/track-by-factory";

export const trackBySelf = trackByFactory(item => item);
export const trackById = trackByFactory<{ id: string }>(item => item.id);
export const trackByDay = trackByFactory<{ day: Day }>(item => item.day);
export const trackByDishType = trackByFactory<{ type: DishType }>(item => item.type);
