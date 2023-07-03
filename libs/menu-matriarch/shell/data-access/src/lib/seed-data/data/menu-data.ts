import { MenuDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createMenuData(
  uid: string,
  { dishIds, menuIds }: SeedDataIds
): Partial<MenuDto>[] {
  return [
    {
      id: menuIds.menu,
      uid,
      name: 'Menu #1',
      contents: {
        Monday: [dishIds.enchiladas],
        Tuesday: [dishIds.sushi, dishIds.misoSoup],
        Wednesday: [dishIds.salmonBurgers, dishIds.sweetPotatoFries],
        Thursday: [dishIds.redLentilSoup],
        Friday: [dishIds.pizza, dishIds.tiramisu],
        Saturday: [dishIds.thaiCurry, dishIds.tiramisu],
        Sunday: [dishIds.friedChicken, dishIds.cornbread, dishIds.macAndCheese],
      },
    },
  ];
}
