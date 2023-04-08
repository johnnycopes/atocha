import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { concatMap, first, map, switchMap } from 'rxjs/operators';

import {
  ButtonComponent,
  ExternalLinkDirective,
  PluralPipe,
  SafePipe,
  trackBySelf,
} from '@atocha/core/ui';
import { DishService } from '@atocha/menu-matriarch/data-access';
import {
  SectionComponent,
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/ui';

@Component({
  standalone: true,
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
  private _id$ = this._route.paramMap.pipe(
    map((paramMap) => paramMap.get('id'))
  );
  dish$ = this._route.params.pipe(
    switchMap(({ id }) => {
      if (!id) {
        return of(undefined);
      }
      return this._dishService.getDish(id);
    })
  );
  readonly ingredientTrackByFn = trackBySelf;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dishService: DishService
  ) {}

  onDelete(): void {
    this._id$
      .pipe(
        first(),
        concatMap((id) => {
          if (!id) {
            return of(undefined);
          }
          return this._dishService.deleteDish(id);
        })
      )
      .subscribe(() =>
        this._router.navigate(['..'], { relativeTo: this._route })
      );
  }
}
