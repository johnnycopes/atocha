import { Menu } from '@atocha/menu-matriarch/shared/util';

export type MenuDto = Omit<Menu, 'entries' | 'orientation' | 'fallbackText'>;
