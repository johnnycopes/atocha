import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, first, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SupabaseService } from '@atocha/supabase/data-access';
import { IDtoService } from '@atocha/menu-matriarch/shared/data-access-api';
import { Meal } from '@atocha/menu-matriarch/shared/util';
import { MealDto } from './meal-dto';

export type EditableMealData = Pick<
  MealDto,
  'name' | 'description' | 'dishIds' | 'tagIds'
>;

type MealRow = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  meal_dishes: { dish_id: string }[];
  meal_tags: { tag_id: string }[];
};

function mapRowToDto(row: MealRow): MealDto {
  return {
    id: row.id,
    uid: row.user_id,
    name: row.name,
    description: row.description,
    dishIds: row.meal_dishes.map((md) => md.dish_id),
    tagIds: row.meal_tags.map((mt) => mt.tag_id),
  };
}

const MEAL_SELECT = '*, meal_dishes(dish_id), meal_tags(tag_id)';

@Injectable({
  providedIn: 'root',
})
export class MealDtoService implements IDtoService<Meal, MealDto> {
  private _supabase = inject(SupabaseService);

  getOne(id: string): Observable<MealDto | undefined> {
    return from(
      this._supabase.client
        .from('meals')
        .select(MEAL_SELECT)
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data }) =>
        data ? mapRowToDto(data as unknown as MealRow) : undefined
      )
    );
  }

  getAll(): Observable<MealDto[]> {
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        const uid = session?.user.id;
        if (!uid) return of([]);
        return from(
          this._supabase.client
            .from('meals')
            .select(MEAL_SELECT)
            .eq('user_id', uid)
            .order('name')
        ).pipe(
          map(({ data }) =>
            (data ?? []).map((row) => mapRowToDto(row as unknown as MealRow))
          )
        );
      })
    );
  }

  async create(meal: EditableMealData): Promise<string> {
    const {
      data: { user },
    } = await this._supabase.client.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await this._supabase.client
      .from('meals')
      .insert({
        user_id: user.id,
        name: meal.name,
        description: meal.description ?? '',
      })
      .select('id')
      .single();
    if (error) throw error;

    const id = data.id;

    if (meal.dishIds?.length) {
      await this._supabase.client
        .from('meal_dishes')
        .insert(
          meal.dishIds.map((dish_id, sort_order) => ({ meal_id: id, dish_id, sort_order }))
        );
    }
    if (meal.tagIds?.length) {
      await this._supabase.client
        .from('meal_tags')
        .insert(meal.tagIds.map((tag_id) => ({ meal_id: id, tag_id })));
    }

    return id;
  }

  async update(meal: Meal, data: EditableMealData): Promise<void> {
    const { error } = await this._supabase.client
      .from('meals')
      .update({ name: data.name, description: data.description })
      .eq('id', meal.id);
    if (error) throw error;

    if (data.dishIds !== undefined) {
      await this._supabase.client.from('meal_dishes').delete().eq('meal_id', meal.id);
      if (data.dishIds.length) {
        await this._supabase.client
          .from('meal_dishes')
          .insert(
            data.dishIds.map((dish_id, sort_order) => ({ meal_id: meal.id, dish_id, sort_order }))
          );
      }
    }
    if (data.tagIds !== undefined) {
      await this._supabase.client.from('meal_tags').delete().eq('meal_id', meal.id);
      if (data.tagIds.length) {
        await this._supabase.client
          .from('meal_tags')
          .insert(data.tagIds.map((tag_id) => ({ meal_id: meal.id, tag_id })));
      }
    }
  }

  async delete(meal: Meal): Promise<void> {
    const { error } = await this._supabase.client
      .from('meals')
      .delete()
      .eq('id', meal.id);
    if (error) throw error;
  }
}
