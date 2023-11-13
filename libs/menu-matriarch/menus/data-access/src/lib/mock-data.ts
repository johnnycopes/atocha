import { createMenuDto } from './create-menu-dto';

export const MENU_DTO = createMenuDto({
  id: 'menu-1',
  uid: 'abc',
  name: '8/23 - 8/30',
  startDay: 'Sunday',
  favorited: false,
  contents: {
    Monday: [],
    Tuesday: ['dish-1'],
    Wednesday: ['dish-2'],
    Thursday: [],
    Friday: ['dish-1', 'dish-2'],
    Saturday: [],
    Sunday: [],
  },
});
