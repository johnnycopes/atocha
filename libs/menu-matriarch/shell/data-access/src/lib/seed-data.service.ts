import { Injectable } from '@angular/core';

import { BatchService, DataService } from '@atocha/core/data-access';
import { SeedData } from './seed-data';

@Injectable({
  providedIn: 'root',
})
export class SeedDataService {
  constructor(
    private _batchService: BatchService,
    private _dataService: DataService
  ) {}

  async createUserData({
    uid,
    name,
    email,
  }: {
    uid: string;
    name: string;
    email: string;
  }): Promise<string> {
    const data = new SeedData(
      this._dataService.createId.bind(this._dataService),
      uid,
      name,
      email
    );
    const batch = this._batchService.createBatch();

    batch.setMultiple([
      ...data.dishes,
      ...data.meals,
      ...data.menus,
      ...data.ingredientTypes,
      ...data.ingredients,
      ...data.tags,
      data.user,
    ]);

    await batch.commit();
    return data.menus[0].id;
  }
}
