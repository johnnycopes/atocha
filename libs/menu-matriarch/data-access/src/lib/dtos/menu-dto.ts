import { Menu } from '@atocha/menu-matriarch/util';

export type MenuDto = Omit<Menu, 'entries' | 'orientation' | 'fallbackText'>;
