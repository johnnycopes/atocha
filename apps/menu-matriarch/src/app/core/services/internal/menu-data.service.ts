import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Day } from '@models/day.type';
import { Endpoint } from '@models/endpoint.enum';
import { Menu } from '@models/menu.interface';
import { MenuDto } from '@models/dtos/menu-dto.interface';
import { createMenuDto } from '@utility/domain/create-dtos';
import { flattenValues } from '@utility/generic/flatten-values';
import { lower } from '@utility/generic/format';
import { sort } from '@utility/generic/sort';
import { BatchService } from './batch.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {
  private _endpoint = Endpoint.menus;

  constructor(
    private _batchService: BatchService,
    private _dataService: DataService,
  ) { }

  public getMenu(id: string): Observable<MenuDto | undefined> {
    return this._dataService.getOne<MenuDto>(this._endpoint, id);
  }

  public getMenus(uid: string): Observable<MenuDto[]> {
    return this._dataService.getMany<MenuDto>(this._endpoint, uid).pipe(
      map(menuDtos => sort(menuDtos, menuDto => lower(menuDto.name))),
    );
  }

  public async createMenu({ uid, menu, startDay }: {
    uid: string,
    menu: Partial<Omit<MenuDto, 'id' | 'uid' | 'startDay'>>,
    startDay: Day,
  }): Promise<string> {
    const id = this._dataService.createId();
    await this._dataService.create<MenuDto>(
      this._endpoint,
      id,
      createMenuDto({
        ...menu,
        id,
        uid,
        startDay,
      }),
    );
    return id;
  }

  public async updateMenu(id: string, data: Partial<MenuDto>): Promise<void> {
    return await this._dataService.update<MenuDto>(this._endpoint, id, data);
  }

  public async updateMenuContents({
    menu, dishIds, day, selected
  }: {
    menu: Menu,
    dishIds: string[],
    day: Day,
    selected: boolean,
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

  public async deleteMenu(menu: Menu): Promise<void> {
    const batch = this._batchService.createBatch();
    batch
      .delete(this._endpoint, menu.id)
      .updateMultiple(
        this._batchService.getDishCountersUpdates({
          dishIds: flattenValues(menu.contents),
          menu,
          change: 'clear',
        }),
      );
    await batch.commit();
  }

  public async deleteMenuContents(menu: Menu, day?: Day): Promise<void> {
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
