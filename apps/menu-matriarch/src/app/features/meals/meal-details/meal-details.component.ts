import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { concatMap, first, map, switchMap, tap } from 'rxjs/operators';

import { MealService } from '@services/meal.service';
import { UserService } from '@services/user.service';
import { trackById, trackBySelf } from '@utility/domain/track-by-functions';
import { getDishTypes } from '@utility/domain/get-dish-types';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealDetailsComponent {
  private _id$ = this._route.paramMap.pipe(
    map(paramMap => paramMap.get('id'))
  );
  public vm$ = combineLatest([
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
  public readonly dishTypes = getDishTypes();
  public readonly typeTrackByFn = trackBySelf;
  public readonly dishTrackByFn = trackById;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _mealService: MealService,
    private _userService: UserService,
  ) { }

  public onDelete(): void {
    this._id$.pipe(
      first(),
      concatMap(id => {
        if (!id) {
          return of(undefined);
        }
        return this._mealService.deleteMeal(id);
      }),
      tap(() => this._router.navigate(['..'], { relativeTo: this._route }))
    ).subscribe();
  }
}
