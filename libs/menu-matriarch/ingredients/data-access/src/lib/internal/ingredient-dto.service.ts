import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, first, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SupabaseService } from '@atocha/supabase/data-access';
import { IDtoService } from '@atocha/menu-matriarch/shared/data-access-api';
import { Ingredient } from '@atocha/menu-matriarch/shared/util';
import { IngredientDto } from './ingredient-dto';

export type EditableIngredientData = Pick<
  IngredientDto,
  'name' | 'typeId' | 'dishIds'
>;

type IngredientRow = {
  id: string;
  user_id: string;
  name: string;
  ingredient_type_id: string | null;
  dish_ingredients: { dish_id: string }[];
};

function mapRowToDto(row: IngredientRow): IngredientDto {
  return {
    id: row.id,
    uid: row.user_id,
    name: row.name,
    typeId: row.ingredient_type_id ?? '',
    dishIds: row.dish_ingredients.map((di) => di.dish_id),
  };
}

@Injectable({
  providedIn: 'root',
})
export class IngredientDtoService
  implements IDtoService<Ingredient, IngredientDto>
{
  private _supabase = inject(SupabaseService);

  getOne(id: string): Observable<IngredientDto | undefined> {
    return from(
      this._supabase.client
        .from('ingredients')
        .select('*, dish_ingredients(dish_id)')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data }) =>
        data ? mapRowToDto(data as unknown as IngredientRow) : undefined
      )
    );
  }

  getAll(): Observable<IngredientDto[]> {
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        const uid = session?.user.id;
        if (!uid) return of([]);
        return from(
          this._supabase.client
            .from('ingredients')
            .select('*, dish_ingredients(dish_id)')
            .eq('user_id', uid)
            .order('name')
        ).pipe(
          map(({ data }) =>
            (data ?? []).map((row) => mapRowToDto(row as unknown as IngredientRow))
          )
        );
      })
    );
  }

  async create(ingredient: EditableIngredientData): Promise<string> {
    const {
      data: { user },
    } = await this._supabase.client.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await this._supabase.client
      .from('ingredients')
      .insert({
        user_id: user.id,
        name: ingredient.name,
        ingredient_type_id: ingredient.typeId || null,
      })
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  }

  async update(ingredient: Ingredient, updates: EditableIngredientData): Promise<void> {
    const patch: Record<string, unknown> = { name: updates.name };
    if (updates.typeId !== undefined) {
      patch['ingredient_type_id'] = updates.typeId || null;
    }
    const { error } = await this._supabase.client
      .from('ingredients')
      .update(patch)
      .eq('id', ingredient.id);
    if (error) throw error;
  }

  async delete(ingredient: Ingredient): Promise<void> {
    const { error } = await this._supabase.client
      .from('ingredients')
      .delete()
      .eq('id', ingredient.id);
    if (error) throw error;
  }
}
