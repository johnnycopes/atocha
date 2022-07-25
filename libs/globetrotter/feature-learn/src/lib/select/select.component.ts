import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { fadeInAnimation } from '@atocha/globetrotter/ui';
import { Route, QuizType, PlaceSelection } from '@atocha/globetrotter/types';
import {
  CountryService,
  SelectService,
} from '@atocha/globetrotter/data-access';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class SelectComponent {
  vm$ = combineLatest([
    this._countryService.countries$,
    this._selectService.selection$,
  ]).pipe(
    map(
      ([
        { regions, countriesBySubregion },
        { places, type, quantity },
      ]) => {
        if (!regions.length) {
          return undefined;
        }
        const numberOfSelectedCountries = Object.keys(places).reduce(
        (total, name) =>
            countriesBySubregion[name]
              ? total + countriesBySubregion[name].length
              : total,
          0
        );
        const invalidQuantity = (
          numberOfSelectedCountries <= 1 ||
          quantity < 2 ||
          quantity > numberOfSelectedCountries
        );
        return {
          regions,
          places,
          type,
          quantity,
          numberOfSelectedCountries,
          invalidQuantity,
        };
      }
    )
  );

  constructor(
    private _countryService: CountryService,
    private _selectService: SelectService,
    private _router: Router
  ) {}

  onTypeChange(type: QuizType): void {
    this._selectService.updateType(type);
  }

  onQuantityChange(quantity: number): void {
    this._selectService.updateQuantity(quantity);
  }

  onPlacesChange(places: PlaceSelection): void {
    this._selectService.updatePlaces(places);
  }

  async onLaunch(): Promise<void> {
    this._selectService.selection$.pipe(first()).subscribe(async (selection) => {
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
