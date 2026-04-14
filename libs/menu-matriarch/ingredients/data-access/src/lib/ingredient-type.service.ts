import { Injectable, inject } from '@angular/core';
import { Observable, catchError, combineLatest, from, map, of } from 'rxjs';

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
  private _ingredientTypeDtoService = inject(IngredientTypeDtoService);
  private _ingredientService = inject(IngredientService);

  getOne(id: string): Observable<IngredientType | undefined> {
    return combineLatest([
      this._ingredientTypeDtoService.getOne(id),
      this._ingredientService.getAll(),
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

  getAll(): Observable<IngredientType[]> {
    return combineLatest([
      this._ingredientTypeDtoService.getAll(),
      this._ingredientService.getAll(),
    ]).pipe(
      map(([ingredientTypeDtos, ingredients]) =>
        ingredientTypeDtos.map((dto) =>
          mapIngredientTypeDtoToIngredientType(dto, ingredients)
        )
      )
    );
  }

  create(
    ingredientType: EditableIngredientTypeData
  ): Observable<string | undefined> {
    return from(this._ingredientTypeDtoService.create(ingredientType)).pipe(
      catchError(() => of(undefined))
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
