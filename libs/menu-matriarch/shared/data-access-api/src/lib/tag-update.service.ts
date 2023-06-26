import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { ApiService, KeyToUpdate } from './batch.service';
import { Endpoint } from './endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class TagUpdateService {
  constructor(private _batchService: ApiService) {}

  getUpdates({
    key,
    initialTagIds,
    finalTagIds,
    entityId,
  }: {
    key: Extract<'mealIds' | 'dishIds', KeyToUpdate>;
    initialTagIds: string[];
    finalTagIds: string[];
    entityId: string;
  }): BatchUpdate[] {
    return this._batchService.getBatchUpdates({
      endpoint: Endpoint.tags,
      key,
      initialIds: initialTagIds,
      finalIds: finalTagIds,
      entityId,
    });
  }
}
