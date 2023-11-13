import { createMenuDto } from '@atocha/menu-matriarch/menus/data-access';
import { SeedDataIds } from './seed-data-ids';

export function createMenuData(uid: string, { dishIds, menuIds }: SeedDataIds) {
  return [
    {
      id: menuIds.menu,
      uid,
      name: 'Menu #1',
      contents: {
        Monday: [dishIds.enchiladas, dishIds.guacamole],
        Tuesday: [dishIds.sushi, dishIds.misoSoup],
        Wednesday: [dishIds.salmonBurgers, dishIds.sweetPotatoFries],
        Thursday: [dishIds.redLentilSoup],
        Friday: [dishIds.pizza, dishIds.tiramisu],
        Saturday: [dishIds.thaiCurry, dishIds.tiramisu],
        Sunday: [dishIds.friedChicken, dishIds.cornbread, dishIds.macAndCheese],
      },
    },
  ].map(createMenuDto);
}
