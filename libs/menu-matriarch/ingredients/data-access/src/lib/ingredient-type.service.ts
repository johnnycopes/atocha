import { Injectable } from '@angular/core';
import {
  Observable,
  combineLatest,
  concatMap,
  first,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { AuthService } from '@atocha/firebase/data-access';
import { IEntityService } from '@atocha/menu-matriarch/shared/data-access-api';
import { IngredientType } from '@atocha/menu-matriarch/shared/util';
import {
  EditableIngredientTypeData,
  IngredientTypeDtoService,
} from './internal/ingredient-type-dto.service';
import { IngredientService } from './ingredient.service';
import { IngredientDtoService } from './internal/ingredient-dto.service';
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
    private _ingredientDtoService: IngredientDtoService,
    private _ingredientService: IngredientService
  ) {}

  getOne(id: string): Observable<IngredientType | undefined> {
    const ingredientTypeDto$ = this._ingredientTypeDtoService.getOne(id);
    const ingredients$ = ingredientTypeDto$.pipe(
      switchMap((dto) =>
        this._ingredientDtoService.getMany(dto?.ingredientIds ?? [])
      )
    );

    return combineLatest([ingredientTypeDto$, ingredients$]).pipe(
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
    return this._authService.uid$.pipe(
      first(),
      concatMap((uid) => {
        if (uid) {
          return this._getIngredientTypes(uid);
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

  private _getIngredientTypes(uid: string) {
    return combineLatest([
      this._ingredientTypeDtoService.getAll(uid),
      this._ingredientService.getAll(),
    ]).pipe(
      map(([ingredientDtos, ingredients]) => {
        return ingredientDtos.map((dishDto) =>
          mapIngredientTypeDtoToIngredientType(dishDto, ingredients)
        );
      }),
      tap(console.log)
    );
  }

  // Working, but no less efficient on the ingredients screen since all ingredients are fetched anyway. Maybe more useful for dishes/meals/menus/tags
  private _newGetIngredientTypes1(uid: string) {
    const dtos$ = this._ingredientTypeDtoService.getAll(uid);
    const ingredients$ = dtos$.pipe(
      map((dtos) => dtos.flatMap((dto) => dto.ingredientIds)),
      concatMap((ids) => this._ingredientDtoService.getMany(ids))
    );

    return combineLatest([dtos$, ingredients$]).pipe(
      map(([dtos, ingredients]) => {
        console.log(dtos, ingredients);
        return dtos.map((dto) =>
          mapIngredientTypeDtoToIngredientType(dto, ingredients)
        );
      }),
      tap(console.log)
    );
  }

  // Not working and not sure why. The idea is to get all dtos, then fetch all ingredients on the dtos
  private _newGetIngredientTypes2(uid: string) {
    const dtos$ = this._ingredientTypeDtoService.getAll(uid);
    const types$ = dtos$.pipe(
      concatMap((dtos) => {
        const types = dtos.flatMap((dto) => {
          const ingredient = this._ingredientDtoService
            .getMany(dto.ingredientIds)
            .pipe(
              map((ingredients) =>
                mapIngredientTypeDtoToIngredientType(dto, ingredients)
              )
            );
          return ingredient;
        });
        return types;
      })
    );
    return types$;
  }
}
