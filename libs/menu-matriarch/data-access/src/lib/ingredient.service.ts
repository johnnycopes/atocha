import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import { Ingredient } from '@atocha/menu-matriarch/util';
import {
  EditableIngredientData,
  IngredientDataService,
} from './internal/ingredient-data.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(
    private _authService: AuthService,
    private _ingredientDataService: IngredientDataService
  ) {}

  getIngredient(id: string): Observable<Ingredient | undefined> {
    return this._ingredientDataService.getIngredient(id);
  }

  getIngredients(): Observable<Ingredient[]> {
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return this._ingredientDataService.getIngredients(uid);
        }
        return of([]);
      })
    );
  }

  createIngredient(
    ingredient: EditableIngredientData
  ): Observable<string | undefined> {
    return this._authService.uid$.pipe(
      first(),
      concatMap(async (uid) => {
        if (uid) {
          const id = await this._ingredientDataService.createIngredient({
            uid,
            ingredient,
          });
          return id;
        } else {
          return undefined;
        }
      })
    );
  }

  updateIngredient(
    ingredient: Ingredient,
    updates: EditableIngredientData
  ): Promise<void> {
    return this._ingredientDataService.updateIngredient(ingredient, updates);
  }

  deleteIngredient(ingredient: Ingredient): Promise<void> {
    return this._ingredientDataService.deleteIngredient(ingredient);
  }
}
