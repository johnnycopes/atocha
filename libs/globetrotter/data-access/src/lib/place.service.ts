import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { State } from '@atocha/core/data-access';
import { Country, Region } from '@atocha/globetrotter/util';
import { ApiService } from './api.service';
import { mapCountryDtoToCountry } from './internal/map-country-dto-to-country';
import { groupBy } from './internal/group-by';
import { sort } from './internal/sort';

// Overrides to API data
const COUNTRY_SUMMARY_NAMES: Readonly<Record<string, string>> = {
  Georgia: 'Georgia country',
};

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private readonly _places = new State<{
    countries: Country[];
    countriesBySubregion: Record<string, Country[]>;
    regions: Region[];
  }>({
    countries: [],
    countriesBySubregion: {},
    regions: [],
  });
  places$ = this._places.get();

  constructor(private _apiService: ApiService) {
    this._apiService.fetchCountries().subscribe((countryDtos) => {
      const countries = sort(
        countryDtos
          .filter(({ unMember }) => unMember)
          .map(mapCountryDtoToCountry),
        ({ name }) => name
      );
      const countriesBySubregion = groupBy(countries, 'subregion');
      const subregionsByRegion =
        this._groupSubregionsByRegion(countriesBySubregion);
      const regions = this._formatRegions(
        countriesBySubregion,
        subregionsByRegion
      );
      this._places.update({
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
