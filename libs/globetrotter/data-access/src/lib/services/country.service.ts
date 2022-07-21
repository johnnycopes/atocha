import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { groupBy } from 'lodash-es';

import { sort } from '@atocha/core/util';
import {
  Country,
  mapCountryDtoToCountry,
  Region,
} from '@atocha/globetrotter/types';
import { ApiService } from './api.service';
import { COUNTRY_SUMMARY_NAMES } from '../data/country-modifications';

interface CountryState {
  countries: Country[];
  countriesBySubregion: Record<string, Country[]>;
  regions: Region[];
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly _countriesSubject = new BehaviorSubject<CountryState>({
    countries: [],
    countriesBySubregion: {},
    regions: [],
  });
  get countries$(): Observable<CountryState> {
    return this._countriesSubject.asObservable();
  }

  constructor(private _apiService: ApiService) {
    this._apiService.fetchCountries().subscribe((countryDtos) => {
      const countries = sort(
        countryDtos
          .filter(({ unMember }) => unMember)
          .map(mapCountryDtoToCountry),
        ({ name }) => name
      );
      const countriesBySubregion = groupBy(
        countries,
        ({ subregion }) => subregion
      );
      const subregionsByRegion =
        this._groupSubregionsByRegion(countriesBySubregion);
      const regions = this._formatRegions(
        countriesBySubregion,
        subregionsByRegion
      );
      this._countriesSubject.next({
        countries,
        countriesBySubregion,
        regions,
      });
    });
  }

  getSummary(countryName: string): Observable<string> {
    const searchTerm = COUNTRY_SUMMARY_NAMES[countryName] || countryName;
    return this._apiService.fetchSummary(searchTerm);
  }

  private _groupSubregionsByRegion(
    countriesBySubregion: Record<string, Country[]>
  ): Record<string, string[]> {
    const subregions: Record<string, string[]> = {};

    for (const [subregion, countries] of Object.entries(countriesBySubregion)) {
      const region = countries?.[0]?.region ?? 'MISSING_REGION';
      subregions[region] = !subregions[region]
        ? [subregion]
        : [...subregions[region], subregion];
    }

    return subregions;
  }

  private _formatRegions(
    countriesBySubregion: Record<string, Country[]>,
    subregionsByRegion: Record<string, string[]>
  ): Region[] {
    const regions: Region[] = [];

    for (const [regionName, subregionNames] of Object.entries(
      subregionsByRegion
    )) {
      regions.push({
        name: regionName,
        subregions: subregionNames.map((subregionName) => ({
          name: subregionName,
          countries: countriesBySubregion[subregionName],
        })),
      });
    }

    return regions;
  }
}
