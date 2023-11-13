import { Injectable } from '@angular/core';
import { BatchService, BatchUpdate } from '@atocha/firebase/data-access';

import { Menu, flattenValues } from '@atocha/menu-matriarch/shared/util';
import { Change, Tally } from './internal/tally';
import { Endpoint } from './types/endpoint.enum';
import { KeyToUpdate } from './key-to-update.type';

@Injectable({
  providedIn: 'root',
})
export class DishUpdateService {
  private readonly _endpoint = Endpoint.dishes;

  constructor(private _batchService: BatchService) {}

  getUpdates({
    key,
    initialDishIds,
    finalDishIds,
    entityId,
  }: {
    key: Extract<'mealIds' | 'ingredientIds' | 'tagIds', KeyToUpdate>;
    initialDishIds: string[];
    finalDishIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    return this._batchService.getBatchUpdates({
      endpoint: this._endpoint,
      key,
      initialIds: initialDishIds,
      finalIds: finalDishIds,
      entityId,
    });
  }

  getCountersUpdates({
    dishIds,
    menu,
    change,
  }: {
    dishIds: string[];
    menu: Menu;
    change: Change;
  }): BatchUpdate[] {
    const dishTally = new Tally(flattenValues(menu.contents));

    return dishIds.map((dishId) => {
      const menusChange = dishTally.calculateChange(dishId, change);
      const menuIds =
        menusChange > 0
          ? this._batchService.addToArray(menu.id)
          : this._batchService.removeFromArray(menu.id);

      return {
        endpoint: this._endpoint,
        id: dishId,
        data: {
          usages: this._batchService.changeCounter(
            change === 'increment' ? 1 : -1
          ),
          ...(menusChange !== 0 && { menuIds }), // Only include `menuIds` if `menusChange` isn't 0
        },
      };
    });
  }
}
