import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, first, of } from 'rxjs';

import { SupabaseService } from '@atocha/supabase/data-access';
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
  private _supabase = inject(SupabaseService);
  private _ingredientDtoService = inject(IngredientDtoService);

  getOne(id: string): Observable<Ingredient | undefined> {
    return this._ingredientDtoService.getOne(id);
  }

  getAll(): Observable<Ingredient[]> {
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        const uid = session?.user.id;
        if (uid) {
          return this._ingredientDtoService.getAll(uid);
        }
        return of([]);
      })
    );
  }

  create(ingredient: EditableIngredientData): Observable<string | undefined> {
    return this._supabase.session$.pipe(
      first(),
      concatMap(async (session) => {
        const uid = session?.user.id;
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
