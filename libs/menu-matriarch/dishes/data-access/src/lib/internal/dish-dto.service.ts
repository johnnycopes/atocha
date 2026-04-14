import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, first, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SupabaseService } from '@atocha/supabase/data-access';
import { IDtoService } from '@atocha/menu-matriarch/shared/data-access-api';
import { Dish, DishType } from '@atocha/menu-matriarch/shared/util';
import { DishDto } from './dish-dto';

export type EditableDishData = Pick<
  DishDto,
  | 'name'
  | 'description'
  | 'link'
  | 'type'
  | 'ingredientIds'
  | 'tagIds'
  | 'notes'
>;

type DishRow = {
  id: string;
  user_id: string;
  name: string;
  type: string;
  description: string;
  link: string;
  notes: string;
  favorited: boolean;
  dish_ingredients: { ingredient_id: string }[];
  dish_tags: { tag_id: string }[];
  meal_dishes: { meal_id: string }[];
  menu_entries: { menu_id: string }[];
};

function mapRowToDto(row: DishRow): DishDto {
  return {
    id: row.id,
    uid: row.user_id,
    name: row.name,
    type: row.type as DishType,
    description: row.description,
    link: row.link,
    notes: row.notes,
    favorited: row.favorited,
    usages: row.menu_entries.length,
    ingredientIds: row.dish_ingredients.map((di) => di.ingredient_id),
    tagIds: row.dish_tags.map((dt) => dt.tag_id),
    mealIds: row.meal_dishes.map((md) => md.meal_id),
    menuIds: [...new Set(row.menu_entries.map((me) => me.menu_id))],
  };
}

const DISH_SELECT =
  '*, dish_ingredients(ingredient_id), dish_tags(tag_id), meal_dishes(meal_id), menu_entries(menu_id)';

@Injectable({
  providedIn: 'root',
})
export class DishDtoService implements IDtoService<Dish, DishDto> {
  private _supabase = inject(SupabaseService);

  getOne(id: string): Observable<DishDto | undefined> {
    return from(
      this._supabase.client
        .from('dishes')
        .select(DISH_SELECT)
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data }) =>
        data ? mapRowToDto(data as unknown as DishRow) : undefined
      )
    );
  }

  getAll(): Observable<DishDto[]> {
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        const uid = session?.user.id;
        if (!uid) return of([]);
        return from(
          this._supabase.client
            .from('dishes')
            .select(DISH_SELECT)
            .eq('user_id', uid)
            .order('name')
        ).pipe(
          map(({ data }) =>
            (data ?? []).map((row) => mapRowToDto(row as unknown as DishRow))
          )
        );
      })
    );
  }

  async create(dish: EditableDishData): Promise<string> {
    const {
      data: { user },
    } = await this._supabase.client.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await this._supabase.client
      .from('dishes')
      .insert({
        user_id: user.id,
        name: dish.name,
        type: dish.type ?? 'main',
        description: dish.description ?? '',
        link: dish.link ?? '',
        notes: dish.notes ?? '',
        favorited: false,
      })
      .select('id')
      .single();
    if (error) throw error;

    const id = data.id;

    if (dish.ingredientIds?.length) {
      await this._supabase.client
        .from('dish_ingredients')
        .insert(dish.ingredientIds.map((ingredient_id) => ({ dish_id: id, ingredient_id })));
    }
    if (dish.tagIds?.length) {
      await this._supabase.client
        .from('dish_tags')
        .insert(dish.tagIds.map((tag_id) => ({ dish_id: id, tag_id })));
    }

    return id;
  }

  async update(dish: Dish, data: EditableDishData): Promise<void> {
    const { error } = await this._supabase.client
      .from('dishes')
      .update({
        name: data.name,
        type: data.type,
        description: data.description,
        link: data.link,
        notes: data.notes,
      })
      .eq('id', dish.id);
    if (error) throw error;

    if (data.ingredientIds !== undefined) {
      await this._supabase.client.from('dish_ingredients').delete().eq('dish_id', dish.id);
      if (data.ingredientIds.length) {
        await this._supabase.client
          .from('dish_ingredients')
          .insert(data.ingredientIds.map((ingredient_id) => ({ dish_id: dish.id, ingredient_id })));
      }
    }
    if (data.tagIds !== undefined) {
      await this._supabase.client.from('dish_tags').delete().eq('dish_id', dish.id);
      if (data.tagIds.length) {
        await this._supabase.client
          .from('dish_tags')
          .insert(data.tagIds.map((tag_id) => ({ dish_id: dish.id, tag_id })));
      }
    }
  }

  async delete(dish: Dish): Promise<void> {
    const { error } = await this._supabase.client
      .from('dishes')
      .delete()
      .eq('id', dish.id);
    if (error) throw error;
  }
}
