import { Injectable } from '@angular/core';

import { BatchService, BatchUpdate } from '@atocha/firebase/data-access';
import { Endpoint } from '../types/endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  constructor(private _batchService: BatchService) {}

  getUpdate({
    uid,
    ingredientTypeIdToAdd,
    ingredientTypeIdToDelete,
  }: {
    uid: string;
    ingredientTypeIdToAdd?: string;
    ingredientTypeIdToDelete?: string;
  }): BatchUpdate {
    return {
      endpoint: Endpoint.users,
      id: uid,
      data: {
        'preferences.ingredientTypeOrder': ingredientTypeIdToAdd
          ? this._batchService.addToArray(ingredientTypeIdToAdd)
          : ingredientTypeIdToDelete
          ? this._batchService.removeFromArray(ingredientTypeIdToDelete)
          : [],
      },
    };
  }
}
