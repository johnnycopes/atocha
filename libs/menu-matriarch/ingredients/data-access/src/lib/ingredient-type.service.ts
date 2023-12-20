import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { AuthService } from '@atocha/firebase/data-access';
import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { IngredientType } from '@atocha/menu-matriarch/shared/util';
import {
  EditableIngredientTypeData,
  IngredientTypeDtoService,
} from './internal/ingredient-type-dto.service';
import { IngredientService } from './ingredient.service';
import { mapIngredientTypeDtoToIngredientType } from './internal/map-ingredient-type-dto-to-ingredient-type';

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeService
  implements IEntityService<IngredientType, EditableIngredientTypeData>
{
  constructor(
    private _authService: AuthService,
    private _ingredientTypeDtoService: IngredientTypeDtoService,
    private _ingredientService: IngredientService
  ) {}

  getOne(id: string): Observable<IngredientType | undefined> {
    return combineLatest([
      this._ingredientTypeDtoService.getOne(id),
      this._ingredientService.getMany(),
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

  getMany(): Observable<IngredientType[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return combineLatest([
            this._ingredientTypeDtoService.getAll(uid),
            this._ingredientService.getMany(),
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

  create(
    ingredientType: EditableIngredientTypeData
  ): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._ingredientTypeDtoService.create(
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

  async update(
    ingredientType: IngredientType,
    updates: EditableIngredientTypeData
  ): Promise<void> {
    return this._ingredientTypeDtoService.update(ingredientType, updates);
  }

  async delete(ingredientType: IngredientType): Promise<void> {
    return this._ingredientTypeDtoService.delete(ingredientType);
  }
}
