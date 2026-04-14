import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, first, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SupabaseService } from '@atocha/supabase/data-access';
import { IDtoService } from '@atocha/menu-matriarch/shared/data-access-api';
import { IngredientType } from '@atocha/menu-matriarch/shared/util';
import { IngredientTypeDto } from './ingredient-type-dto';

export type EditableIngredientTypeData = Partial<
  Pick<IngredientTypeDto, 'name' | 'ingredientIds'>
>;

type IngredientTypeRow = {
  id: string;
  user_id: string;
  name: string;
  sort_order: number;
  ingredients: { id: string }[];
};

function mapRowToDto(row: IngredientTypeRow): IngredientTypeDto {
  return {
    id: row.id,
    uid: row.user_id,
    name: row.name,
    ingredientIds: row.ingredients.map((i) => i.id),
  };
}

@Injectable({
  providedIn: 'root',
})
export class IngredientTypeDtoService
  implements IDtoService<IngredientType, IngredientTypeDto>
{
  private _supabase = inject(SupabaseService);

  getOne(id: string): Observable<IngredientTypeDto | undefined> {
    return from(
      this._supabase.client
        .from('ingredient_types')
        .select('*, ingredients(id)')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data }) =>
        data ? mapRowToDto(data as unknown as IngredientTypeRow) : undefined
      )
    );
  }

  getAll(): Observable<IngredientTypeDto[]> {
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        const uid = session?.user.id;
        if (!uid) return of([]);
        return from(
          this._supabase.client
            .from('ingredient_types')
            .select('*, ingredients(id)')
            .eq('user_id', uid)
            .order('sort_order')
        ).pipe(
          map(({ data }) =>
            (data ?? []).map((row) => mapRowToDto(row as unknown as IngredientTypeRow))
          )
        );
      })
    );
  }

  async create(data: EditableIngredientTypeData): Promise<string> {
    const {
      data: { user },
    } = await this._supabase.client.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: existing } = await this._supabase.client
      .from('ingredient_types')
      .select('sort_order')
      .eq('user_id', user.id)
      .order('sort_order', { ascending: false })
      .limit(1);

    const nextSortOrder = existing?.length ? existing[0].sort_order + 1 : 0;

    const { data: created, error } = await this._supabase.client
      .from('ingredient_types')
      .insert({ name: data.name ?? '', user_id: user.id, sort_order: nextSortOrder })
      .select('id')
      .single();

    if (error) throw error;
    return created.id;
  }

  async update(ingredientType: IngredientType, data: EditableIngredientTypeData): Promise<void> {
    const { error } = await this._supabase.client
      .from('ingredient_types')
      .update({ name: data.name })
      .eq('id', ingredientType.id);
    if (error) throw error;
  }

  async delete(ingredientType: IngredientType): Promise<void> {
    const { error } = await this._supabase.client
      .from('ingredient_types')
      .delete()
      .eq('id', ingredientType.id);
    if (error) throw error;
  }
}
