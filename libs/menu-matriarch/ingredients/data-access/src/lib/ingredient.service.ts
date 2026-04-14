import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, of } from 'rxjs';

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
  private _ingredientDtoService = inject(IngredientDtoService);

  getOne(id: string): Observable<Ingredient | undefined> {
    return this._ingredientDtoService.getOne(id);
  }

  getAll(): Observable<Ingredient[]> {
    return this._ingredientDtoService.getAll();
  }

  create(ingredient: EditableIngredientData): Observable<string | undefined> {
    return from(this._ingredientDtoService.create(ingredient)).pipe(
      catchError(() => of(undefined))
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
