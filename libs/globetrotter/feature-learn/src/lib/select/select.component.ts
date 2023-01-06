import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { fadeInAnimation } from '@atocha/globetrotter/ui';
import { Route, QuizType } from '@atocha/globetrotter/util';
import { PlaceService, SelectService } from '@atocha/globetrotter/data-access';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class SelectComponent {
  vm$ = combineLatest([
    this._placeService.places$,
    this._selectService.selection$,
  ]).pipe(
    map(([{ regions, countriesBySubregion }, { model, type, quantity }]) => {
      if (!regions.length) {
        return undefined;
      }
      const selectedCountriesQuantity = model.reduce(
        (total, name) =>
          countriesBySubregion[name]
            ? total + countriesBySubregion[name].length
            : total,
        0
      );
      return {
        regions,
        model,
        type,
        quantity,
        invalidQuantity:
          selectedCountriesQuantity < 2 ||
          quantity < 2 ||
          quantity > selectedCountriesQuantity,
      };
    })
  );

  constructor(
    private _placeService: PlaceService,
    private _selectService: SelectService,
    private _router: Router
  ) {}

  onTypeChange(type: QuizType): void {
    this._selectService.updateType(type);
  }

  onQuantityChange(quantity: number): void {
    this._selectService.updateQuantity(quantity);
  }

  onModelChange(model: string[]): void {
    this._selectService.updateModel(model);
  }

  async onLaunch(): Promise<void> {
    this._selectService.selection$
      .pipe(first())
      .subscribe(async (selection) => {
        if (!selection) {
          return;
        }
        const queryParams =
          this._selectService.mapSelectionToQueryParams(selection);
        await this._router.navigate([`${Route.learn}/${Route.quiz}`], {
          queryParams,
        });
      });
  }
}
