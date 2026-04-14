import { Injectable, inject } from '@angular/core';
import { Observable, concatMap, first, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SupabaseService } from '@atocha/supabase/data-access';
import { User, UserPreferences } from '@atocha/menu-matriarch/shared/util';

type UserRow = {
  id: string;
  email: string;
  name: string;
  dark_mode: boolean;
  day_name_display: string;
  default_menu_start_day: string;
  empty_meal_text: string;
  meal_orientation: string;
};

function mapRowToUser(row: UserRow): User {
  return {
    uid: row.id,
    email: row.email,
    name: row.name,
    preferences: {
      darkMode: row.dark_mode,
      dayNameDisplay: row.day_name_display as 'full',
      defaultMenuStartDay: row.default_menu_start_day as User['preferences']['defaultMenuStartDay'],
      emptyMealText: row.empty_meal_text,
      mealOrientation: row.meal_orientation as User['preferences']['mealOrientation'],
      ingredientTypeOrder: [],
    },
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserDtoService {
  private _supabase = inject(SupabaseService);

  getUser(): Observable<User | undefined> {
    return this._supabase.session$.pipe(
      first(),
      concatMap((session) => {
        const uid = session?.user.id;
        if (!uid) return of(undefined);
        return from(
          this._supabase.client.from('users').select('*').eq('id', uid).single()
        ).pipe(
          map(({ data }) =>
            data ? mapRowToUser(data as unknown as UserRow) : undefined
          )
        );
      })
    );
  }

  getPreferences(): Observable<UserPreferences | undefined> {
    return this.getUser().pipe(map((user) => user?.preferences));
  }

  async updatePreferences(
    { uid }: User,
    data: Partial<UserPreferences>
  ): Promise<void> {
    const updates: Record<string, unknown> = {};
    if (data.darkMode !== undefined) updates['dark_mode'] = data.darkMode;
    if (data.dayNameDisplay !== undefined) updates['day_name_display'] = data.dayNameDisplay;
    if (data.defaultMenuStartDay !== undefined) updates['default_menu_start_day'] = data.defaultMenuStartDay;
    if (data.emptyMealText !== undefined) updates['empty_meal_text'] = data.emptyMealText;
    if (data.mealOrientation !== undefined) updates['meal_orientation'] = data.mealOrientation;
    // ingredientTypeOrder is encoded in ingredient_types.sort_order — not updated here

    if (Object.keys(updates).length === 0) return;

    const { error } = await this._supabase.client
      .from('users')
      .update(updates)
      .eq('id', uid);
    if (error) throw error;
  }
}
