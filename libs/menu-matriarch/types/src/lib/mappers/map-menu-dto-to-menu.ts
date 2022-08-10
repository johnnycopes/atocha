import { Dish } from "../dish.interface";
import { getDays } from "../functions/get-days";
import { MenuDto, Menu } from "../menu.interface";
import { UserPreferences } from "../user.interface";

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
      dishes: dishes.filter(({ id }) =>
        menuDto.contents[day].includes(id)
      ),
    })),
    orientation: preferences?.mealOrientation ?? 'horizontal',
    fallbackText: preferences?.emptyMealText ?? '',
  };
}
