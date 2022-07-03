import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
import { pickBy } from 'lodash-es';

import { fadeInAnimation } from '@atocha/globetrotter/ui';
import { Selection, Route } from '@atocha/globetrotter/types';
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
  private _selection: Selection | undefined;
  private _selection$ = this._selectService.selection.pipe(
    tap((selection) => (this._selection = selection))
  );
  private _quantity$ = this._selectService.selection.pipe(
    map(({ quantity }) => quantity)
  );
  private _numberOfSelectedCountries$ = combineLatest([
    this._countryService.countries.pipe(
      map(({ countriesBySubregion }) => countriesBySubregion)
    ),
    this._selection$,
  ]).pipe(
    map(([subregions, selection]) => {
      const selectedCountries = pickBy(
        selection.countries,
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
    this._quantity$,
  ]).pipe(
    map(([numberOfSelectedCountries, quantity]) => {
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
    this._quantity$,
    this._invalidQuantity$,
  ]).pipe(
    map(([numberOfSelectedCountries, quantity, invalidQuantity]) => ({
      numberOfSelectedCountries,
      quantity,
      invalidQuantity,
    }))
  );

  constructor(
    private _countryService: CountryService,
    private _selectService: SelectService,
    private _router: Router
  ) {}

  async onLaunch(): Promise<void> {
    if (!this._selection) {
      return;
    }

    const queryParams = this._selectService.mapSelectionToQueryParams(this._selection);
    await this._router.navigate([`${Route.learn}/${Route.quiz}`], {
      queryParams,
    });
  }
}
