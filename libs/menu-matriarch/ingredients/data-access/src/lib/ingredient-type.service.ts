import { Injectable, inject } from '@angular/core';
import { Observable, combineLatest, concatMap, first, map, of } from 'rxjs';

import { SupabaseService } from '@atocha/supabase/data-access';
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
  private _supabase = inject(SupabaseService);
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
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        const uid = session?.user.id;
        if (uid) {
          return combineLatest([
            this._ingredientTypeDtoService.getAll(uid),
            this._ingredientService.getAll(),
          ]).pipe(
            map(([ingredientTypeDtos, ingredients]) =>
              ingredientTypeDtos.map((dto) =>
                mapIngredientTypeDtoToIngredientType(dto, ingredients)
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
    return this._supabase.session$.pipe(
      first(),
      concatMap(async (session) => {
        const uid = session?.user.id;
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
