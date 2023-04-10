import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, first, tap } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import { IngredientDataService } from './internal/ingredient-data.service';
import { Ingredient } from '@atocha/menu-matriarch/util';
import { IngredientDto } from './internal/dtos/ingredient-dto';

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
    ingredient: Partial<Omit<IngredientDto, 'id' | 'uid'>>
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
    id: string,
    updates: Partial<IngredientDto>
  ): Observable<Ingredient | undefined> {
    return this.getIngredient(id).pipe(
      first(),
      tap(async (ingredient) => {
        if (!ingredient) {
          return;
        }
        await this._ingredientDataService.updateIngredient(ingredient, updates);
      })
    );
  }

  deleteIngredient(id: string): Observable<Ingredient | undefined> {
    return this.getIngredient(id).pipe(
      first(),
      tap(async (ingredient) => {
        if (!ingredient) {
          return;
        }
        await this._ingredientDataService.deleteIngredient(ingredient);
      })
    );
  }
}
