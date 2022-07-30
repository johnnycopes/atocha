import { MenuDto } from "./dtos/menu-dto.interface";
import { Orientation } from "./orientation.type";
import { MenuEntry } from "./menu-entry.interface";

export interface Menu extends MenuDto {
  entries: MenuEntry[],
  orientation: Orientation,
  fallbackText: string;
}
