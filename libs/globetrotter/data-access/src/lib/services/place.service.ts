import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { groupBy } from 'lodash-es';

import { sort } from '@atocha/core/util-ts';
import {
  Country,
  mapCountryDtoToCountry,
  Region,
} from '@atocha/globetrotter/types';
import { ApiService } from './api.service';
import { COUNTRY_SUMMARY_NAMES } from '../data/country-modifications';

interface Places {
  countries: Country[];
  countriesBySubregion: Record<string, Country[]>;
  regions: Region[];
}

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private readonly _placesSubject = new BehaviorSubject<Places>({
    countries: [],
    countriesBySubregion: {},
    regions: [],
  });
  places$ = this._placesSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

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
      this._placesSubject.next({
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
