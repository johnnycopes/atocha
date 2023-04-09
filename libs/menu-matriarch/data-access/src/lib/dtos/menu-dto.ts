import { Menu } from '@atocha/menu-matriarch/util';

export type MenuDto = Omit<Menu, 'entries' | 'orientation' | 'fallbackText'>;

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
