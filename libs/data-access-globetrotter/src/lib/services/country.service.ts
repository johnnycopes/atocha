import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { groupBy, reduce, shuffle, map as _map } from 'lodash-es';
import { Dictionary } from 'lodash';

import { Country, Region, Selection } from '@atocha/types-globetrotter';
import { ApiService } from './api.service';
import { COUNTRY_STATUSES } from '../data/country-statuses';
import {
  COUNTRY_APP_NAMES,
  COUNTRY_SUMMARY_NAMES,
} from '../data/country-modifications';

interface ICountryState {
  flatCountries: Country[];
  countriesBySubregion: Dictionary<Country[]>;
  nestedCountries: Region[];
}

@Injectable({
  providedIn: 'root',
})
export class CountryService implements Resolve<Observable<Country[]>> {
  private _request: Observable<Country[]> = of([]);
  private readonly _countries = new BehaviorSubject<ICountryState>({
    flatCountries: [],
    countriesBySubregion: {},
    nestedCountries: [],
  });
  get countries(): Observable<ICountryState> {
    return this._countries;
  }

  constructor(private _apiService: ApiService) {
    this._apiService.fetchCountries().subscribe((countriesData) => {
      const flatCountries = this._sanitizeRawData(countriesData);
      const countriesBySubregion = groupBy(flatCountries, 'subregion');
      const subregionsByRegion =
        this._groupSubregionsByRegion(countriesBySubregion);
      const nestedCountries = this._formatNestedCountries(
        countriesBySubregion,
        subregionsByRegion
      );
      this._countries.next({
        flatCountries,
        countriesBySubregion,
        nestedCountries,
      });
    });
  }

  resolve(): Observable<Country[]> {
    return this._request;
  }

  getCountriesFromSelection(selection: Selection): Observable<Country[]> {
    return this.countries.pipe(
      map(({ countriesBySubregion }) => {
        const quantity = selection.quantity || undefined;
        const countries = reduce(
          selection.countries,
          (accum, checkboxState, placeName) => {
            if (
              checkboxState === 'checked' &&
              countriesBySubregion[placeName]
            ) {
              const selectedCountries = countriesBySubregion[placeName];
              return accum.concat(selectedCountries);
            }
            return accum;
          },
          [] as Country[]
        );
        return shuffle(countries).slice(0, quantity);
      })
    );
  }

  getSummary(countryName: string): Observable<string> {
    const searchTerm = COUNTRY_SUMMARY_NAMES[countryName] || countryName;
    return this._apiService.fetchSummary(searchTerm);
  }

  private _sanitizeRawData(countries: Country[]): Country[] {
    const sanitizedCountries: Country[] = [];
    for (const country of countries) {
      if (COUNTRY_STATUSES[country.name]) {
        country.name = COUNTRY_APP_NAMES[country.name] || country.name;
        sanitizedCountries.push(country);
      }
    }
    return sanitizedCountries;
  }

  private _groupSubregionsByRegion(
    countriesBySubregion: Dictionary<Country[]>
  ): Dictionary<string[]> {
    return reduce(
      countriesBySubregion,
      (accum, countries, subregion) => {
        const region = countries?.[0]?.region ?? 'ERROR';
        if (!accum[region]) {
          return {
            ...accum,
            [region]: [subregion],
          };
        } else {
          const subregions = accum[region].slice();
          return {
            ...accum,
            [region]: [...subregions, subregion],
          };
        }
      },
      {} as Dictionary<string[]>
    );
  }

  private _formatNestedCountries(
    countriesBySubregion: Dictionary<Country[]>,
    subregionsByRegion: Dictionary<string[]>
  ): Region[] {
    return reduce(
      subregionsByRegion,
      (accum, subregions, region) => {
        const subregionsData = _map(subregions, (subregion) => {
          return {
            name: subregion,
            region: region,
            countries: countriesBySubregion[subregion],
          };
        });
        const regionData = {
          name: region,
          subregions: subregionsData,
        };
        const regions = accum.slice();
        return [...regions, regionData];
      },
      [] as Region[]
    );
  }
}
