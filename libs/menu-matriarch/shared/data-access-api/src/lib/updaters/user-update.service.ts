import { Injectable, inject } from '@angular/core';

import { BatchService, BatchUpdate } from '@atocha/firebase/data-access';
import { Endpoint } from '../types/endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  private _batchService = inject(BatchService);

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
