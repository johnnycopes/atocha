import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { groupBy, reduce, shuffle, map as _map } from 'lodash-es';

import { sort } from '@atocha/core/util';
import {
  Country,
  CountryDto,
  Region,
  Selection,
} from '@atocha/globetrotter/types';
import { ApiService } from './api.service';
import {
  CALLING_CODES,
  COUNTRY_SUMMARY_NAMES,
} from '../data/country-modifications';

interface CountryState {
  flatCountries: Country[];
  countriesBySubregion: Record<string, Country[]>;
  nestedCountries: Region[];
}

@Injectable({
  providedIn: 'root',
})
export class CountryService implements Resolve<Observable<Country[]>> {
  private _request: Observable<Country[]> = of([]);
  private readonly _countries = new BehaviorSubject<CountryState>({
    flatCountries: [],
    countriesBySubregion: {},
    nestedCountries: [],
  });
  get countries(): Observable<CountryState> {
    return this._countries;
  }

  constructor(private _apiService: ApiService) {
    this._apiService.fetchCountries().subscribe((countryDtos) => {
      const flatCountries = sort(
        countryDtos
          .filter(({ unMember }) => unMember)
          .map((dto) => this._transformDto(dto)),
        ({ name }) => name
      );
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
          selection.places,
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

  private _transformDto(dto: CountryDto): Country {
    return {
      area: dto.area,
      callingCodes:
        CALLING_CODES[dto.name.common] ||
        dto.idd.suffixes.map((suffix) => dto.idd.root + suffix),
      capital: dto.capital[0],
      cioc: dto.cioc,
      currencies: Object.keys(dto.currencies),
      demonym: dto.demonyms?.['eng']?.m ?? '',
      flag: dto.flags.svg,
      languages: Object.values(dto.languages),
      name: dto.name.common,
      population: dto.population,
      region: dto.region,
      subregion: dto.subregion,
      topLevelDomain: dto.tld,
    };
  }

  private _groupSubregionsByRegion(
    countriesBySubregion: Record<string, Country[]>
  ): Record<string, string[]> {
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
      {} as Record<string, string[]>
    );
  }

  private _formatNestedCountries(
    countriesBySubregion: Record<string, Country[]>,
    subregionsByRegion: Record<string, string[]>
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
