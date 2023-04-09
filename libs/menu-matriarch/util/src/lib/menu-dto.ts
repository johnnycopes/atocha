import { Menu } from './menu.interface';

export type MenuDto = Omit<Menu, 'entries' | 'orientation' | 'fallbackText'>;
