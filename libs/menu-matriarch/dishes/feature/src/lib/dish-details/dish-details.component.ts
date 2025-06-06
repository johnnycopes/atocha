import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { concatMap, first, of, switchMap } from 'rxjs';

import {
  ButtonComponent,
  ExternalLinkDirective,
  PluralPipe,
  SafePipe,
  trackBySelf,
} from '@atocha/core/ui';
import { DishService } from '@atocha/menu-matriarch/dishes/data-access';
import { SectionComponent } from '@atocha/menu-matriarch/shared/ui';
import {
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/tags/ui';

@Component({
  selector: 'app-dish-details',
  imports: [
    ButtonComponent,
    CommonModule,
    ExternalLinkDirective,
    PluralPipe,
    RouterModule,
    SafePipe,
    SectionComponent,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishDetailsComponent {
  dish$ = this._route.params.pipe(
    switchMap(({ id }) => {
      if (!id) {
        return of(undefined);
      }
      return this._dishService.getOne(id);
    })
  );
  readonly ingredientTrackByFn = trackBySelf;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dishService: DishService
  ) {}

  onDelete(): void {
    this.dish$
      .pipe(
        first(),
        concatMap((dish) => {
          if (!dish) {
            return of(undefined);
          }
          return this._dishService.delete(dish);
        })
      )
      .subscribe(() =>
        this._router.navigate(['..'], { relativeTo: this._route })
      );
  }
}
