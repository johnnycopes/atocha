import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map, tap } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import {
  Day,
  Dish,
  Menu,
  MenuDto,
  UserPreferences,
  getDays,
} from '@atocha/menu-matriarch/types';
import { DishService } from './dish.service';
import { LocalStorageService } from './internal/local-storage.service';
import { MenuDataService } from './internal/menu-data.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private _authService: AuthService,
    private _dishService: DishService,
    private _localStorageService: LocalStorageService,
    private _menuDataService: MenuDataService,
    private _userService: UserService
  ) {}

  getMenu(id: string): Observable<Menu | undefined> {
    return combineLatest([
      this._menuDataService.getMenu(id),
      this._dishService.getDishes(),
      this._userService.getPreferences(),
    ]).pipe(
      map(([menuDto, dishes, preferences]) => {
        if (!menuDto || !preferences) {
          return undefined;
        }
        return this._transformDto({ menuDto, dishes, preferences });
      })
    );
  }

  getMenus(): Observable<Menu[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return combineLatest([
            this._menuDataService.getMenus(uid),
            this._dishService.getDishes(),
            this._userService.getPreferences(),
          ]).pipe(
            map(([menuDtos, dishes, preferences]) => {
              if (!preferences) {
                return [];
              }
              return menuDtos.map((menuDto) =>
                this._transformDto({ menuDto, dishes, preferences })
              );
            })
          );
        }
        return of([]);
      })
    );
  }

  createMenu(
    menu: Partial<Omit<MenuDto, 'id' | 'uid' | 'startDay'>>
  ): Observable<string | undefined> {
    return this._userService.getUser().pipe(
      first(),
      concatMap(async (user) => {
        if (user) {
          const id = await this._menuDataService.createMenu({
            uid: user.uid,
            menu,
            startDay: user.preferences.defaultMenuStartDay,
          });
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  updateMenuName(id: string, name: string): Promise<void> {
    return this._menuDataService.updateMenu(id, { name });
  }

  updateMenuStartDay(id: string, startDay: Day): Promise<void> {
    return this._menuDataService.updateMenu(id, { startDay });
  }

  updateMenuContents({
    menu,
    day,
    dishIds,
    selected,
  }: {
    menu: Menu;
    day: Day;
    dishIds: string[];
    selected: boolean;
  }): Promise<void> {
    return this._menuDataService.updateMenuContents({
      menu,
      day,
      dishIds,
      selected,
    });
  }

  async deleteMenu(id?: string): Promise<void> {
    if (id) {
      this.getMenu(id)
        .pipe(
          first(),
          tap(async (menu) => {
            if (!menu) {
              return;
            }
            await this._menuDataService.deleteMenu(menu);
            if (id === this._localStorageService.getMenuId()) {
              this._localStorageService.deleteMenuId();
            }
          })
        )
        .subscribe();
    }
  }

  deleteMenuContents(menu: Menu, day?: Day): Promise<void> {
    return this._menuDataService.deleteMenuContents(menu, day);
  }

  private _transformDto({
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
        dishes: dishes.filter((dish) =>
          menuDto.contents[day].includes(dish.id)
        ),
      })),
      orientation: preferences?.mealOrientation ?? 'horizontal',
      fallbackText: preferences?.emptyMealText ?? '',
    };
  }
}
