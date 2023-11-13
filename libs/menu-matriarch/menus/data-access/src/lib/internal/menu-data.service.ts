import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BatchService, DataService } from '@atocha/firebase/data-access';
import {
  DishUpdateService,
  IDtoService,
  Endpoint,
  MenuUpdateService,
} from '@atocha/menu-matriarch/shared/data-access-api';
import { Day, Menu, flattenValues } from '@atocha/menu-matriarch/shared/util';
import { MenuDto } from './menu-dto';
import { createMenuDto } from '../create-menu-dto';

export type EditableMenuData = Partial<Pick<MenuDto, 'name' | 'startDay'>>;

@Injectable({
  providedIn: 'root',
})
export class MenuDataService implements IDtoService<Menu, MenuDto> {
  private readonly _endpoint = Endpoint.menus;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService<MenuDto>,
    private _dishUpdateService: DishUpdateService,
    private _menuUpdateService: MenuUpdateService
  ) {}

  getOne(id: string): Observable<MenuDto | undefined> {
    return this._dataService.getOne(this._endpoint, id);
  }

  getMany(uid: string): Observable<MenuDto[]> {
    return this._dataService.getMany(this._endpoint, uid);
  }

  async create(uid: string, menu: EditableMenuData): Promise<string> {
    const id = this._dataService.createId();

    await this._dataService.create(
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

  async update({ id }: Menu, data: EditableMenuData): Promise<void> {
    return await this._dataService.update(this._endpoint, id, data);
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
      ...this._dishUpdateService.getCountersUpdates({
        dishIds,
        menu,
        change: selected ? 'increment' : 'decrement',
      }),
      ...this._menuUpdateService.getContentsUpdates({
        menuIds: [menu.id],
        dishIds,
        day,
        change: selected ? 'add' : 'remove',
      }),
    ]);

    await batch.commit();
  }

  async delete(menu: Menu): Promise<void> {
    const batch = this._batchService.createBatch();

    batch.delete(this._endpoint, menu.id).updateMultiple(
      this._dishUpdateService.getCountersUpdates({
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
        ...this._menuUpdateService.getContentsUpdates({
          menuIds: [menu.id],
          dishIds: [],
          day,
        }),
        ...this._dishUpdateService.getCountersUpdates({
          dishIds: menu.contents[day],
          menu,
          change: 'decrement',
        }),
      ]);
    }
    // Clear all days' contents
    else {
      batch.updateMultiple([
        ...this._menuUpdateService.getContentsUpdates({
          menuIds: [menu.id],
          dishIds: [],
        }),
        ...this._dishUpdateService.getCountersUpdates({
          dishIds: flattenValues(menu.contents),
          menu,
          change: 'clear',
        }),
      ]);
    }

    await batch.commit();
  }
}
