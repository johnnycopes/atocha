import { Injectable } from '@angular/core';

import { BatchService, BatchUpdate } from '@atocha/firebase/data-access';
import { Endpoint } from '../types/endpoint.enum';
import { KeyToUpdate } from './internal/key-to-update.type';

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
