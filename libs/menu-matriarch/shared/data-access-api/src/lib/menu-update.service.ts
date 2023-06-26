import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { Day } from '@atocha/menu-matriarch/shared/util';
import { ApiService } from './batch.service';
import { Endpoint } from './endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class MenuUpdateService {
  constructor(private _batchService: ApiService) {}

  getContentsUpdates({
    menuIds,
    dishIds,
    day,
    change,
  }: {
    menuIds: string[];
    dishIds: string[];
    day?: Day;
    change?: 'add' | 'remove';
  }): BatchUpdate[] {
    if (dishIds.length && !change) {
      throw new Error(
        "A 'change' argument is needed in order to modify the menus' dishes"
      );
    }

    let updatedDishIds: string[] = [];
    if (change === 'add') {
      updatedDishIds = this._batchService.addToArray(...dishIds);
    } else if (change === 'remove') {
      updatedDishIds = this._batchService.removeFromArray(...dishIds);
    }

    return menuIds.map((menuId) => ({
      endpoint: Endpoint.menus,
      id: menuId,
      data: this._getMenuContentsData(updatedDishIds, day),
    }));
  }

  private _getMenuContentsData(
    dishIds: string[],
    day: Day | undefined
  ): Record<string, string[]> {
    if (day) {
      return { [`contents.${day}`]: dishIds };
    } else {
      return {
        'contents.Monday': dishIds,
        'contents.Tuesday': dishIds,
        'contents.Wednesday': dishIds,
        'contents.Thursday': dishIds,
        'contents.Friday': dishIds,
        'contents.Saturday': dishIds,
        'contents.Sunday': dishIds,
      };
    }
  }
}
