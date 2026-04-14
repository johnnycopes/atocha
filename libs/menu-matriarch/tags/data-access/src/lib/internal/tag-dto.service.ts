import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { SupabaseService } from '@atocha/supabase/data-access';
import { IDtoService } from '@atocha/menu-matriarch/shared/data-access-api';
import { Tag } from '@atocha/menu-matriarch/shared/util';
import { TagDto } from './tag-dto';

export type EditableTagData = Pick<TagDto, 'name'>;

type TagRow = {
  id: string;
  user_id: string;
  name: string;
  color: string;
  dish_tags: { dish_id: string }[];
  meal_tags: { meal_id: string }[];
};

function mapRowToTag(row: TagRow): Tag {
  return {
    id: row.id,
    uid: row.user_id,
    name: row.name,
    color: row.color,
    dishIds: row.dish_tags.map((dt) => dt.dish_id),
    mealIds: row.meal_tags.map((mt) => mt.meal_id),
  };
}

@Injectable({
  providedIn: 'root',
})
export class TagDtoService implements IDtoService<Tag, TagDto> {
  private _supabase = inject(SupabaseService);

  getOne(id: string): Observable<Tag | undefined> {
    return from(
      this._supabase.client
        .from('tags')
        .select('*, dish_tags(dish_id), meal_tags(meal_id)')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data }) => (data ? mapRowToTag(data as unknown as TagRow) : undefined))
    );
  }

  getAll(_uid: string): Observable<Tag[]> {
    return from(
      this._supabase.client
        .from('tags')
        .select('*, dish_tags(dish_id), meal_tags(meal_id)')
        .order('name')
    ).pipe(
      map(({ data }) =>
        (data ?? []).map((row) => mapRowToTag(row as unknown as TagRow))
      )
    );
  }

  async create(_uid: string, tag: EditableTagData): Promise<string> {
    const {
      data: { user },
    } = await this._supabase.client.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await this._supabase.client
      .from('tags')
      .insert({ name: tag.name, color: '', user_id: user.id })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  }

  async update(tag: Tag, data: EditableTagData): Promise<void> {
    const { error } = await this._supabase.client
      .from('tags')
      .update({ name: data.name })
      .eq('id', tag.id);

    if (error) throw error;
  }

  async delete(tag: Tag): Promise<void> {
    const { error } = await this._supabase.client
      .from('tags')
      .delete()
      .eq('id', tag.id);

    if (error) throw error;
  }
}
