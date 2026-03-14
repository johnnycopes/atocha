import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, concatMap, first, map, of, switchMap } from 'rxjs';

import { ButtonComponent, trackBySelf } from '@atocha/core/ui';
import { MealService } from '@atocha/menu-matriarch/meals/data-access';
import { MealSummaryComponent } from '@atocha/menu-matriarch/meals/ui';
import { UserService } from '@atocha/menu-matriarch/settings/data-access';
import { getDishTypes } from '@atocha/menu-matriarch/shared/util';
import {
  SectionComponent,
  dishTrackByFn,
} from '@atocha/menu-matriarch/shared/ui';
import {
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/tags/ui';

@Component({
  selector: 'app-meal-details',
  imports: [
    ButtonComponent,
    CommonModule,
    MealSummaryComponent,
    SectionComponent,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
    RouterLink,
  ],
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealDetailsComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _mealService = inject(MealService);
  private _userService = inject(UserService);

  vm$ = combineLatest([
    this._route.params.pipe(
      switchMap(({ id }) => {
        if (!id) {
          return of(undefined);
        }
        return this._mealService.getOne(id);
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

  onDelete(): void {
    this.vm$
      .pipe(
        first(),
        concatMap(({ meal }) => {
          if (!meal) {
            return of(undefined);
          }
          return this._mealService.delete(meal);
        })
      )
      .subscribe(() =>
        this._router.navigate(['..'], { relativeTo: this._route })
      );
  }
}
