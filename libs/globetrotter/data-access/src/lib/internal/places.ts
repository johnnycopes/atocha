import { Country, Region } from '@atocha/globetrotter/util';
import { CountryDto } from './country-dto.interface';
import { sort } from './sort';
import { mapCountryDtoToCountry } from './map-country-dto-to-country';
import { groupBy } from './group-by';

export class Places {
  countries: Country[];
  countriesBySubregion: Record<string, Country[]>;
  regions: Region[];

  constructor(countryDtos: readonly CountryDto[] = []) {
    this.countries = sort(
      countryDtos
        .filter(({ unMember }) => unMember)
        .map(mapCountryDtoToCountry),
      ({ name }) => name
    );
    this.countriesBySubregion = groupBy(this.countries, 'subregion');
    const subregionsByRegion = this._groupSubregionsByRegion(
      this.countriesBySubregion
    );
    this.regions = this._formatRegions(
      this.countriesBySubregion,
      subregionsByRegion
    );
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
