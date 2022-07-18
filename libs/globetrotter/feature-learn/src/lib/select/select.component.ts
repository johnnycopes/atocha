import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { first, map, distinctUntilChanged } from 'rxjs/operators';
import { pickBy } from 'lodash-es';

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
  private _selection$ = this._selectService.selection;
  private _places$ = this._countryService.countries.pipe(
    map(({ nestedCountries }) => nestedCountries)
  );
  private _numberOfSelectedCountries$ = combineLatest([
    this._countryService.countries.pipe(
      map(({ countriesBySubregion }) => countriesBySubregion)
    ),
    this._selection$,
  ]).pipe(
    map(([subregions, selection]) => {
      const selectedCountries = pickBy(
        selection.places,
        (value) => value === 'checked'
      );
      return Object.keys(selectedCountries).reduce(
        (total, currentPlace) =>
          subregions[currentPlace]
            ? total + subregions[currentPlace].length
            : total,
        0
      );
    }),
    distinctUntilChanged()
  );
  private _invalidQuantity$ = combineLatest([
    this._numberOfSelectedCountries$,
    this._selection$,
  ]).pipe(
    map(([numberOfSelectedCountries, { quantity }]) => {
      return (
        numberOfSelectedCountries <= 1 ||
        quantity < 2 ||
        quantity > numberOfSelectedCountries
      );
    }),
    distinctUntilChanged()
  );
  vm$ = combineLatest([
    this._numberOfSelectedCountries$,
    this._places$,
    this._selection$,
    this._invalidQuantity$,
  ]).pipe(
    map(
      ([
        numberOfSelectedCountries,
        places,
        { places: placeSelection, type, quantity },
        invalidQuantity,
      ]) => {
        if (!places.length) {
          return undefined;
        }
        return {
          numberOfSelectedCountries,
          places,
          placeSelection,
          type,
          quantity,
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

  onPlaceSelectionChange(places: PlaceSelection): void {
    this._selectService.updatePlaces(places);
  }

  onTypeChange(type: QuizType): void {
    this._selectService.updateType(type);
  }

  onQuantityChange(quantity: number): void {
    this._selectService.updateQuantity(quantity);
  }

  async onLaunch(): Promise<void> {
    this._selection$.pipe(first()).subscribe(async (selection) => {
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
