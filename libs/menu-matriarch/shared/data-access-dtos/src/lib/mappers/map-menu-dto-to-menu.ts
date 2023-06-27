import {
  Dish,
  UserPreferences,
  Menu,
  getDays,
} from '@atocha/menu-matriarch/shared/util';
import { MenuDto } from '../menu-dto';

export function mapMenuDtoToMenu({
  menuDto,
  dishes,
  preferences,
}: {
  menuDto: MenuDto;
  dishes: Dish[];
  preferences: UserPreferences;
}): Menu {
  return {
    ...menuDto,
    entries: getDays(menuDto.startDay).map((day) => ({
      day,
      dishes: dishes.filter(({ id }) => menuDto.contents[day].includes(id)),
    })),
    orientation: preferences?.mealOrientation ?? 'horizontal',
    fallbackText: preferences?.emptyMealText ?? '',
  };
}
