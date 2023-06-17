import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import { IngredientType } from '@atocha/menu-matriarch/util';
import {
  EditableIngredientTypeData,
  IngredientTypeDataService,
} from './internal/ingredient-type-data.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeService {
  constructor(
    private _authService: AuthService,
    private _ingredientTypeDataService: IngredientTypeDataService
  ) {}

  getIngredientType(id: string): Observable<IngredientType | undefined> {
    return this._ingredientTypeDataService.getIngredientType(id);
  }

  getIngredientTypes(): Observable<IngredientType[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return this._ingredientTypeDataService.getIngredientTypes(uid);
        }
        return of([]);
      })
    );
  }

  createIngredientType(
    ingredientType: EditableIngredientTypeData
  ): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._ingredientTypeDataService.createIngredientType(
            uid,
            ingredientType
          );
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  updateIngredientType(
    ingredientType: IngredientType,
    updates: EditableIngredientTypeData
  ): Promise<void> {
    return this._ingredientTypeDataService.updateIngredientType(
      ingredientType,
      updates
    );
  }

  deleteIngredientType(ingredientType: IngredientType): Promise<void> {
    return this._ingredientTypeDataService.deleteIngredientType(ingredientType);
  }
}
