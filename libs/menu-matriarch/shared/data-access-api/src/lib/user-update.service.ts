import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { ApiService } from './batch.service';
import { Endpoint } from './endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  constructor(private _batchService: ApiService) {}

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
