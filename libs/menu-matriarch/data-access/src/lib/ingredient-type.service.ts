import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import { IngredientType } from '@atocha/menu-matriarch/util';
import {
  EditableIngredientTypeData,
  IngredientTypeDataService,
} from './internal/ingredient-type-data.service';
import { mapIngredientTypeDtoToIngredientType } from './internal/mappers/map-ingredient-type-dto-to-ingredient-type';
import { IngredientService } from './ingredient.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeService {
  constructor(
    private _authService: AuthService,
    private _ingredientTypeDataService: IngredientTypeDataService,
    private _ingredientService: IngredientService
  ) {}

  getIngredientType(id: string): Observable<IngredientType | undefined> {
    return combineLatest([
      this._ingredientTypeDataService.getIngredientType(id),
      this._ingredientService.getIngredients(),
    ]).pipe(
      map(([ingredientTypeDto, ingredients]) => {
        if (!ingredientTypeDto) {
          return undefined;
        }
        return mapIngredientTypeDtoToIngredientType(
          ingredientTypeDto,
          ingredients
        );
      })
    );
  }

  getIngredientTypes(): Observable<IngredientType[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return combineLatest([
            this._ingredientTypeDataService.getIngredientTypes(uid),
            this._ingredientService.getIngredients(),
          ]).pipe(
            map(([dishDtos, ingredients]) =>
              dishDtos.map((dishDto) =>
                mapIngredientTypeDtoToIngredientType(dishDto, ingredients)
              )
            )
          );
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

  async updateIngredientType(
    ingredientType: IngredientType,
    updates: EditableIngredientTypeData
  ): Promise<void> {
    return this._ingredientTypeDataService.updateIngredientType(
      ingredientType,
      updates
    );
  }

  async deleteIngredientType(ingredientType: IngredientType): Promise<void> {
    return this._ingredientTypeDataService.deleteIngredientType(ingredientType);
  }
}
