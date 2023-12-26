import { Injectable } from '@angular/core';

import { State } from '@atocha/core/data-access';
import { CountryService } from './country.service';
import { Places } from './places';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private readonly _places = new State(new Places());
  places$ = this._places.get();

  constructor(private _countryService: CountryService) {
    this._countryService.countries$.subscribe({
      next: (countries) => this._places.update(new Places(countries)),
    });
  }
}
