import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { AuthService } from '@atocha/firebase/data-access';
import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { DishService } from '@atocha/menu-matriarch/dishes/data-access';
import { UserService } from '@atocha/menu-matriarch/settings/data-access';
import { RouterService } from '@atocha/menu-matriarch/shared/data-access-routing';
import { Day, Menu } from '@atocha/menu-matriarch/shared/util';
import { EditableMenuData, MenuDtoService } from './internal/menu-dto.service';
import { mapMenuDtoToMenu } from './internal/map-menu-dto-to-menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService implements IEntityService<Menu, EditableMenuData> {
  activeMenuId$ = this._routerService.activeMenuId$;

  constructor(
    private _authService: AuthService,
    private _dishService: DishService,
    private _menuDataService: MenuDtoService,
    private _routerService: RouterService,
    private _userService: UserService
  ) {}

  getOne(id: string): Observable<Menu | undefined> {
    return combineLatest([
      this._menuDataService.getOne(id),
      this._dishService.getMany(),
      this._userService.getPreferences(),
    ]).pipe(
      map(([menuDto, dishes, preferences]) => {
        if (!menuDto || !preferences) {
          return undefined;
        }
        return mapMenuDtoToMenu({ menuDto, dishes, preferences });
      })
    );
  }

  getMany(): Observable<Menu[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return combineLatest([
            this._menuDataService.getMany(uid),
            this._dishService.getMany(),
            this._userService.getPreferences(),
          ]).pipe(
            map(([menuDtos, dishes, preferences]) => {
              if (!preferences) {
                return [];
              }
              return menuDtos.map((menuDto) =>
                mapMenuDtoToMenu({ menuDto, dishes, preferences })
              );
            })
          );
        }
        return of([]);
      })
    );
  }

  create({ name }: EditableMenuData): Observable<string | undefined> {
    return this._userService.getUser().pipe(
      first(),
      concatMap(async (user) => {
        if (user) {
          const id = await this._menuDataService.create(user.uid, {
            name,
            startDay: user.preferences.defaultMenuStartDay,
          });
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  async update(menu: Menu, data: EditableMenuData): Promise<void> {
    return this._menuDataService.update(menu, data);
  }

  async updateMenuContents({
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

  async delete(menu: Menu): Promise<void> {
    return this._menuDataService.delete(menu);
  }

  async deleteMenuContents(menu: Menu, day?: Day): Promise<void> {
    return this._menuDataService.deleteMenuContents(menu, day);
  }
}
