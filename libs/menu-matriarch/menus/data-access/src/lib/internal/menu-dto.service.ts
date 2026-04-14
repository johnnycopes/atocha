import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { SupabaseService } from '@atocha/supabase/data-access';
import { IDtoService } from '@atocha/menu-matriarch/shared/data-access-api';
import { Day, Menu } from '@atocha/menu-matriarch/shared/util';
import { MenuDto } from './menu-dto';

export type EditableMenuData = Partial<Pick<MenuDto, 'name' | 'startDay'>>;

const ALL_DAYS: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

type MenuRow = {
  id: string;
  user_id: string;
  name: string;
  favorited: boolean;
  start_day: string;
  menu_entries: { day: string; dish_id: string; sort_order: number }[];
};

function mapRowToDto(row: MenuRow): MenuDto {
  const contents = Object.fromEntries(
    ALL_DAYS.map((d) => [d, []]),
  ) as unknown as { [day in Day]: string[] };

  for (const entry of [...row.menu_entries].sort(
    (a, b) => a.sort_order - b.sort_order,
  )) {
    contents[entry.day as Day].push(entry.dish_id);
  }

  return {
    id: row.id,
    uid: row.user_id,
    name: row.name,
    favorited: row.favorited,
    startDay: row.start_day as Day,
    contents,
  };
}

@Injectable({
  providedIn: 'root',
})
export class MenuDtoService implements IDtoService<Menu, MenuDto> {
  private _supabase = inject(SupabaseService);

  getOne(id: string): Observable<MenuDto | undefined> {
    return from(
      this._supabase.client
        .from('menus')
        .select('*, menu_entries(day, dish_id, sort_order)')
        .eq('id', id)
        .single(),
    ).pipe(
      map(({ data }) =>
        data ? mapRowToDto(data as unknown as MenuRow) : undefined,
      ),
    );
  }

  getAll(uid: string): Observable<MenuDto[]> {
    return from(
      this._supabase.client
        .from('menus')
        .select('*, menu_entries(day, dish_id, sort_order)')
        .eq('user_id', uid)
        .order('name'),
    ).pipe(
      map(({ data }) =>
        (data ?? []).map((row) => mapRowToDto(row as unknown as MenuRow)),
      ),
    );
  }

  async create(uid: string, menu: EditableMenuData): Promise<string> {
    const { data, error } = await this._supabase.client
      .from('menus')
      .insert({
        user_id: uid,
        name: menu.name ?? '',
        favorited: false,
        start_day: menu.startDay ?? 'Monday',
      })
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  }

  async update({ id }: Menu, data: EditableMenuData): Promise<void> {
    const patch: Record<string, unknown> = {};
    if (data.name !== undefined) patch['name'] = data.name;
    if (data.startDay !== undefined) patch['start_day'] = data.startDay;

    const { error } = await this._supabase.client
      .from('menus')
      .update(patch)
      .eq('id', id);
    if (error) throw error;
  }

  async updateMenuContents({
    menu,
    dishIds,
    day,
    selected,
  }: {
    menu: Menu;
    dishIds: string[];
    day: Day;
    selected: boolean;
  }): Promise<void> {
    if (selected) {
      const { data: existing } = await this._supabase.client
        .from('menu_entries')
        .select('sort_order')
        .eq('menu_id', menu.id)
        .eq('day', day)
        .order('sort_order', { ascending: false })
        .limit(1);

      const nextOrder = (existing?.[0]?.sort_order ?? -1) + 1;

      const { error } = await this._supabase.client.from('menu_entries').insert(
        dishIds.map((dish_id, i) => ({
          menu_id: menu.id,
          day,
          dish_id,
          sort_order: nextOrder + i,
        })),
      );
      if (error) throw error;
    } else {
      const { error } = await this._supabase.client
        .from('menu_entries')
        .delete()
        .eq('menu_id', menu.id)
        .eq('day', day)
        .in('dish_id', dishIds);
      if (error) throw error;
    }
  }

  async delete(menu: Menu): Promise<void> {
    const { error } = await this._supabase.client
      .from('menus')
      .delete()
      .eq('id', menu.id);
    if (error) throw error;
  }

  async deleteMenuContents(menu: Menu, day?: Day): Promise<void> {
    let query = this._supabase.client
      .from('menu_entries')
      .delete()
      .eq('menu_id', menu.id);

    if (day) {
      query = query.eq('day', day);
    }

    const { error } = await query;
    if (error) throw error;
  }
}
