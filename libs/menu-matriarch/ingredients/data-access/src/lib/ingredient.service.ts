import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';

import { AuthService } from '@atocha/firebase/data-access';
import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { Ingredient } from '@atocha/menu-matriarch/shared/util';
import {
  EditableIngredientData,
  IngredientDtoService,
} from './internal/ingredient-dto.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientService
  implements IEntityService<Ingredient, EditableIngredientData>
{
  constructor(
    private _authService: AuthService,
    private _ingredientDtoService: IngredientDtoService
  ) {}

  getOne(id: string): Observable<Ingredient | undefined> {
    return this._ingredientDtoService.getOne(id);
  }

  getMany(): Observable<Ingredient[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return this._ingredientDtoService.getAll(uid);
        }
        return of([]);
      })
    );
  }

  create(ingredient: EditableIngredientData): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._ingredientDtoService.create(uid, ingredient);
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  update(
    ingredient: Ingredient,
    updates: EditableIngredientData
  ): Promise<void> {
    return this._ingredientDtoService.update(ingredient, updates);
  }

  delete(ingredient: Ingredient): Promise<void> {
    return this._ingredientDtoService.delete(ingredient);
  }
}
