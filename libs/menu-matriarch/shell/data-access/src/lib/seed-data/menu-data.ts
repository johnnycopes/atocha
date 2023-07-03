import { MenuDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createMenuData(
  uid: string,
  ids: SeedDataIds
): Partial<MenuDto>[] {
  return [
    {
      id: ids.menuIds.menu,
      uid: uid,
      name: 'Menu #1',
      contents: {
        Monday: [ids.dishIds.enchiladas],
        Tuesday: [ids.dishIds.sushi, ids.dishIds.misoSoup],
        Wednesday: [ids.dishIds.salmonBurgers, ids.dishIds.sweetPotatoFries],
        Thursday: [ids.dishIds.redLentilSoup],
        Friday: [ids.dishIds.pizza, ids.dishIds.tiramisu],
        Saturday: [ids.dishIds.thaiCurry, ids.dishIds.tiramisu],
        Sunday: [
          ids.dishIds.friedChicken,
          ids.dishIds.cornbread,
          ids.dishIds.macAndCheese,
        ],
      },
    },
  ];
}
