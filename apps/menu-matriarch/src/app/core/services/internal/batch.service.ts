import { Injectable } from '@angular/core';

import { Day } from '@models/day.type';
import { Menu } from '@models/menu.interface';
import { Endpoint } from '@models/endpoint.enum';
import { calculateTallyChange, TallyChange } from '@utility/generic/calculate-tally-change';
import { flattenValues } from '@utility/generic/flatten-values';
import { tally } from '@utility/generic/tally';
import { uniqueDiff } from '@utility/generic/unique-diff';
import { Batch, BatchUpdate } from './batch';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private _firestoreService: FirestoreService) { }

  public createBatch(): Batch {
    return new Batch(
      this._firestoreService.createBatch(),
      (endpoint, id) => this._firestoreService.getDocRef(endpoint, id),
    );
  }

  public getMenuContentsUpdates({ menuIds, dishIds, day, change }: {
    menuIds: string[],
    dishIds: string[],
    day?: Day,
    change?: 'add' | 'remove',
  }): BatchUpdate[] {
    if (dishIds.length && !change) {
      throw new Error("A 'change' argument is needed in order to modify the menus' dishes");
    }
    let updatedDishIds: string[] = [];
    if (change === 'add') {
      updatedDishIds = this._firestoreService.addToArray(...dishIds);
    } else if (change === 'remove') {
      updatedDishIds = this._firestoreService.removeFromArray(...dishIds);
    }
    return menuIds.map(menuId => ({
      endpoint: Endpoint.menus,
      id: menuId,
      data: this._getMenuContentsData(updatedDishIds, day),
    }));
  }

  public getMealUpdates({ key, initialMealIds, finalMealIds, entityId }: {
    key: 'dishIds' | 'tagIds',
    initialMealIds: string[],
    finalMealIds: string[],
    entityId: string,
  }): BatchUpdate[] {
    return this._getBatchUpdates({
      endpoint: Endpoint.meals,
      key,
      initialIds: initialMealIds,
      finalIds: finalMealIds,
      entityId,
    });
  }

  public getDishUpdates({ key, initialDishIds, finalDishIds, entityId }: {
    key: 'mealIds' | 'tagIds',
    initialDishIds: string[],
    finalDishIds: string[],
    entityId: string,
  }): BatchUpdate[] {
    return this._getBatchUpdates({
      endpoint: Endpoint.dishes,
      key,
      initialIds: initialDishIds,
      finalIds: finalDishIds,
      entityId,
    });
  }

  public getDishCountersUpdates({ dishIds, menu, change }: {
    dishIds: string[],
    menu: Menu,
    change: TallyChange,
  }): BatchUpdate[] {
    const dishCounts = tally(flattenValues(menu.contents));
    return dishIds.map(dishId => {
      const menusChange = calculateTallyChange({
        tally: dishCounts,
        key: dishId,
        change,
      });
      const menuIds = menusChange > 0
        ? this._firestoreService.addToArray(menu.id)
        : this._firestoreService.removeFromArray(menu.id);
      return {
        endpoint: Endpoint.dishes,
        id: dishId,
        data: {
          usages: this._firestoreService.changeCounter(change === 'increment' ? 1 : -1),
          ...(menusChange !== 0 && { menuIds }), // only include `menuIds` if `menusChange` isn't 0
        },
      };
    });
  }

  public getTagUpdates({ key, initialTagIds, finalTagIds, entityId }: {
    key: 'mealIds' | 'dishIds',
    initialTagIds: string[],
    finalTagIds: string[],
    entityId: string,
  }): BatchUpdate[] {
    return this._getBatchUpdates({
      endpoint: Endpoint.tags,
      key,
      initialIds: initialTagIds,
      finalIds: finalTagIds,
      entityId,
    });
  }

  private _getBatchUpdates({ endpoint, key, initialIds, finalIds, entityId }: {
    endpoint: string,
    key: 'mealIds' | 'dishIds' | 'tagIds',
    initialIds: string[],
    finalIds: string[],
    entityId: string,
  }): BatchUpdate[] {
    const { added, removed } = uniqueDiff(initialIds, finalIds);
    const batchUpdates: BatchUpdate[] = [
      ...added.map(id => ({
        endpoint,
        id,
        data: { [key]: this._firestoreService.addToArray(entityId) }
      })),
      ...removed.map(id => ({
        endpoint,
        id,
        data: { [key]: this._firestoreService.removeFromArray(entityId) }
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
