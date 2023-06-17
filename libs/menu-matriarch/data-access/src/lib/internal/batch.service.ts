import { Injectable } from '@angular/core';

import { Batch, BatchUpdate, FirestoreService } from '@atocha/core/data-access';
import {
  calculateTallyChange,
  flattenValues,
  tally,
  TallyChange,
  uniqueDiff,
} from '@atocha/core/util';
import { Day, Menu } from '@atocha/menu-matriarch/util';
import { Endpoint } from './endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private _firestoreService: FirestoreService) {}

  createBatch(): Batch {
    return new Batch(this._firestoreService.createBatch(), (endpoint, id) =>
      this._firestoreService.getDocRef(endpoint, id)
    );
  }

  getMenuContentsUpdates({
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
      updatedDishIds = this._firestoreService.addToArray(...dishIds);
    } else if (change === 'remove') {
      updatedDishIds = this._firestoreService.removeFromArray(...dishIds);
    }

    return menuIds.map((menuId) => ({
      endpoint: Endpoint.menus,
      id: menuId,
      data: this._getMenuContentsData(updatedDishIds, day),
    }));
  }

  getMealUpdates({
    key,
    initialMealIds,
    finalMealIds,
    entityId,
  }: {
    key: 'dishIds' | 'tagIds';
    initialMealIds: string[];
    finalMealIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    return this._getBatchUpdates({
      endpoint: Endpoint.meals,
      key,
      initialIds: initialMealIds,
      finalIds: finalMealIds,
      entityId,
    });
  }

  getDishUpdates({
    key,
    initialDishIds,
    finalDishIds,
    entityId,
  }: {
    key: 'mealIds' | 'tagIds';
    initialDishIds: string[];
    finalDishIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    return this._getBatchUpdates({
      endpoint: Endpoint.dishes,
      key,
      initialIds: initialDishIds,
      finalIds: finalDishIds,
      entityId,
    });
  }

  getDishCountersUpdates({
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
          ? this._firestoreService.addToArray(menu.id)
          : this._firestoreService.removeFromArray(menu.id);

      return {
        endpoint: Endpoint.dishes,
        id: dishId,
        data: {
          usages: this._firestoreService.changeCounter(
            change === 'increment' ? 1 : -1
          ),
          ...(menusChange !== 0 && { menuIds }), // Only include `menuIds` if `menusChange` isn't 0
        },
      };
    });
  }

  getIngredientTypeUpdates({
    ingredientId,
    initialTypeId,
    finalTypeId,
  }: {
    ingredientId: string;
    initialTypeId: string;
    finalTypeId: string;
  }): BatchUpdate[] {
    return [
      {
        endpoint: Endpoint.ingredientTypes,
        id: initialTypeId,
        data: {
          ingredientIds: this._firestoreService.removeFromArray(ingredientId),
        },
      },
      {
        endpoint: Endpoint.ingredientTypes,
        id: finalTypeId,
        data: {
          ingredientIds: this._firestoreService.addToArray(ingredientId),
        },
      },
    ];
  }

  getTagUpdates({
    key,
    initialTagIds,
    finalTagIds,
    entityId,
  }: {
    key: 'mealIds' | 'dishIds';
    initialTagIds: string[];
    finalTagIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    return this._getBatchUpdates({
      endpoint: Endpoint.tags,
      key,
      initialIds: initialTagIds,
      finalIds: finalTagIds,
      entityId,
    });
  }

  private _getBatchUpdates({
    endpoint,
    key,
    initialIds,
    finalIds,
    entityId,
  }: {
    endpoint: string;
    key: 'mealIds' | 'dishIds' | 'tagIds';
    initialIds: string[];
    finalIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    const { added, removed } = uniqueDiff(initialIds, finalIds);
    const batchUpdates: BatchUpdate[] = [
      ...added.map((id) => ({
        endpoint,
        id,
        data: { [key]: this._firestoreService.addToArray(entityId) },
      })),
      ...removed.map((id) => ({
        endpoint,
        id,
        data: { [key]: this._firestoreService.removeFromArray(entityId) },
      })),
    ];

    return batchUpdates;
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
