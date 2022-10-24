import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  first,
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';

import { AuthService, LocalStorageService } from '@atocha/core/data-access';
import {
  Day,
  Menu,
  MenuDto,
  mapMenuDtoToMenu,
  LocalStorageKey,
} from '@atocha/menu-matriarch/util';
import { DishService } from './dish.service';
import { MenuDataService } from './internal/menu-data.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _activeMenuIdSubject = new BehaviorSubject<string | null>(
    this._localStorageService.getItem(LocalStorageKey.menuId)
  );

  activeMenuId$ = this._activeMenuIdSubject.pipe(
    tap((id) => {
      if (id) {
        this._localStorageService.setItem(LocalStorageKey.menuId, id);
      } else {
        this._localStorageService.removeItem(LocalStorageKey.menuId);
      }
    }),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

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
        return mapMenuDtoToMenu({ menuDto, dishes, preferences });
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
                mapMenuDtoToMenu({ menuDto, dishes, preferences })
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

  updateActiveMenuId(id: string | null): void {
    this._activeMenuIdSubject.next(id);
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
            this.activeMenuId$.pipe(first()).subscribe((menuId) => {
              if (id === menuId) {
                this.updateActiveMenuId(null);
              }
            });
          })
        )
        .subscribe();
    }
  }

  deleteMenuContents(menu: Menu, day?: Day): Promise<void> {
    return this._menuDataService.deleteMenuContents(menu, day);
  }
}
