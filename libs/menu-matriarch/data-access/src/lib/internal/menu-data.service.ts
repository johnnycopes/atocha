import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '@atocha/core/data-access';
import { flattenValues, lower, sort } from '@atocha/core/util';
import { Day, Menu } from '@atocha/menu-matriarch/util';
import { MenuDto, createMenuDto } from './dtos/menu-dto';
import { BatchService } from './batch.service';
import { Endpoint } from './endpoint.enum';

export type EditableMenuData = Partial<Pick<MenuDto, 'name' | 'startDay'>>;

@Injectable({
  providedIn: 'root',
})
export class MenuDataService {
  private _endpoint = Endpoint.menus;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService
  ) {}

  getMenu(id: string): Observable<MenuDto | undefined> {
    return this._dataService.getOne<MenuDto>(this._endpoint, id);
  }

  getMenus(uid: string): Observable<MenuDto[]> {
    return this._dataService
      .getMany<MenuDto>(this._endpoint, uid)
      .pipe(map((menuDtos) => sort(menuDtos, ({ name }) => lower(name))));
  }

  async createMenu(uid: string, menu: EditableMenuData): Promise<string> {
    const id = this._dataService.createId();

    await this._dataService.create<MenuDto>(
      this._endpoint,
      id,
      createMenuDto({
        id,
        uid,
        ...menu,
      })
    );

    return id;
  }

  async updateMenu(id: string, data: EditableMenuData): Promise<void> {
    return await this._dataService.update<MenuDto>(this._endpoint, id, data);
  }

  async updateMenuContents({
    menu,
    dishIds,
    day,
    selected,
  }: {
    menu: Menu;
    dishIds: string[];
    day: Day;
    selected: boolean;
  }): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.updateMultiple([
      ...this._batchService.getDishCountersUpdates({
        dishIds,
        menu,
        change: selected ? 'increment' : 'decrement',
      }),
      ...this._batchService.getMenuContentsUpdates({
        menuIds: [menu.id],
        dishIds,
        day,
        change: selected ? 'add' : 'remove',
      }),
    ]);

    await batch.commit();
  }

  async deleteMenu(menu: Menu): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(this._endpoint, menu.id).updateMultiple(
      this._batchService.getDishCountersUpdates({
        dishIds: flattenValues(menu.contents),
        menu,
        change: 'clear',
      })
    );

    await batch.commit();
  }

  async deleteMenuContents(menu: Menu, day?: Day): Promise<void> {
    const batch = this._batchService.createBatch();

    // Clear a single day's contents
    if (day) {
      batch.updateMultiple([
        ...this._batchService.getMenuContentsUpdates({
          menuIds: [menu.id],
          dishIds: [],
          day,
        }),
        ...this._batchService.getDishCountersUpdates({
          dishIds: menu.contents[day],
          menu,
          change: 'decrement',
        }),
      ]);
    }
    // Clear all days' contents
    else {
      batch.updateMultiple([
        ...this._batchService.getMenuContentsUpdates({
          menuIds: [menu.id],
          dishIds: [],
        }),
        ...this._batchService.getDishCountersUpdates({
          dishIds: flattenValues(menu.contents),
          menu,
          change: 'clear',
        }),
      ]);
    }

    await batch.commit();
  }
}
