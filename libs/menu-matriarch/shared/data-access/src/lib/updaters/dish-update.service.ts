import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { BatchService, KeyToUpdate } from './batch.service';
import { Endpoint } from '../endpoint.enum';
import {
  TallyChange,
  calculateTallyChange,
  flattenValues,
  tally,
} from '@atocha/core/util';
import { Menu } from '@atocha/menu-matriarch/shared/util';

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
    change: TallyChange;
  }): BatchUpdate[] {
    const dishCounts = tally(flattenValues(menu.contents));

    return dishIds.map((dishId) => {
      const menusChange = calculateTallyChange({
        tally: dishCounts,
        key: dishId,
        change,
      });
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
