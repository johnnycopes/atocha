import { Injectable } from '@angular/core';
import { Observable, combineLatest, concatMap, first, map, of } from 'rxjs';

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
    private _menuDtoService: MenuDtoService,
    private _routerService: RouterService,
    private _userService: UserService
  ) {}

  getOne(id: string): Observable<Menu | undefined> {
    return combineLatest([
      this._menuDtoService.getOne(id),
      this._dishService.getAll(),
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

  getAll(): Observable<Menu[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return combineLatest([
            this._menuDtoService.getAll(uid),
            this._dishService.getAll(),
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
          const id = await this._menuDtoService.create(user.uid, {
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
    return this._menuDtoService.update(menu, data);
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
    return this._menuDtoService.updateMenuContents({
      menu,
      day,
      dishIds,
      selected,
    });
  }

  async delete(menu: Menu): Promise<void> {
    return this._menuDtoService.delete(menu);
  }

  async deleteMenuContents(menu: Menu, day?: Day): Promise<void> {
    return this._menuDtoService.deleteMenuContents(menu, day);
  }
}
