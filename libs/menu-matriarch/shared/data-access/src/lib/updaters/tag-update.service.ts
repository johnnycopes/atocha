import { Injectable } from '@angular/core';
import { BatchUpdate } from '@atocha/core/data-access';

import { BatchService } from './batch.service';
import { Endpoint } from '../endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class TagUpdateService {
  constructor(private _batchService: BatchService) {}

  getUpdates({
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
    return this._batchService.getBatchUpdates({
      endpoint: Endpoint.tags,
      key,
      initialIds: initialTagIds,
      finalIds: finalTagIds,
      entityId,
    });
  }
}
