import { Injectable, inject } from '@angular/core';
import { first } from 'rxjs';

import { State } from '@atocha/core/data-access';
import { CountryService } from '@atocha/globetrotter/shared/data-access';
import { Places } from './internal/places';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private _countryService = inject(CountryService);

  private readonly _places = new State(new Places());
  places$ = this._places.get();

  constructor() {
    this._countryService.countries$.pipe(first()).subscribe({
      next: (countries) => this._places.update(new Places(countries)),
    });
  }
}
