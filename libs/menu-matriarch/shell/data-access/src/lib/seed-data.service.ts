import { Injectable } from '@angular/core';

import { BatchService, DtoService } from '@atocha/firebase/data-access';
import { SeedData } from './seed-data/seed-data';

@Injectable({
  providedIn: 'root',
})
export class SeedDataService {
  constructor(
    private _batchService: BatchService,
    private _dtoService: DtoService<unknown>
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
    const { dishes, meals, menus, ingredientTypes, ingredients, tags, user } =
      new SeedData(
        uid,
        name,
        email,
        this._dtoService.createId.bind(this._dtoService)
      );
    const batch = this._batchService.createBatch();

    batch
      .setMultiple(dishes)
      .setMultiple(meals)
      .setMultiple(menus)
      .setMultiple(ingredientTypes)
      .setMultiple(ingredients)
      .setMultiple(tags)
      .set(user);

    await batch.commit();
    return menus[0].id;
  }
}
