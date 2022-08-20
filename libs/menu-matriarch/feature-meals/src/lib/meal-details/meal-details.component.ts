import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { concatMap, first, map, switchMap, tap } from 'rxjs/operators';

import { trackBySelf } from '@atocha/core/ui';
import { MealService, UserService } from '@atocha/menu-matriarch/data-access';
import { getDishTypes } from '@atocha/menu-matriarch/util';
import { dishTrackByFn } from '@atocha/menu-matriarch/ui';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealDetailsComponent {
  private _id$ = this._route.paramMap.pipe(
    map((paramMap) => paramMap.get('id'))
  );
  vm$ = combineLatest([
    this._route.params.pipe(
      switchMap(({ id }) => {
        if (!id) {
          return of(undefined);
        }
        return this._mealService.getMeal(id);
      })
    ),
    this._userService.getPreferences(),
  ]).pipe(
    map(([meal, preferences]) => ({
      meal,
      fallbackText: preferences?.emptyMealText ?? '',
      orientation: preferences?.mealOrientation ?? 'horizontal',
    }))
  );
  readonly dishTypes = getDishTypes();
  readonly typeTrackByFn = trackBySelf;
  readonly dishTrackByFn = dishTrackByFn;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _mealService: MealService,
    private _userService: UserService
  ) {}

  onDelete(): void {
    this._id$
      .pipe(
        first(),
        concatMap((id) => {
          if (!id) {
            return of(undefined);
          }
          return this._mealService.deleteMeal(id);
        }),
        tap(() => this._router.navigate(['..'], { relativeTo: this._route }))
      )
      .subscribe();
  }

  onDishClick(id: string): void {
    this._router.navigate(['dishes', id]);
  }
}
