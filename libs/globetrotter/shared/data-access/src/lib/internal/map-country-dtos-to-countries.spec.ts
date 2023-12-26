import { mapCountryDtosToCountries } from './map-country-dtos-to-countries';
import {
  DJIBOUTI_DTO,
  MONTENEGRO_DTO,
  PHILIPPINES_DTO,
  PUERTO_RICO_DTO,
  SEYCHELLES_DTO,
} from './mock-data/country-dtos';
import {
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from './mock-data/countries';

describe('mapCountryDtosToCountries', () => {
  it('returns non-UN member countries, sorted alphabetically by name', () => {
    expect(
      mapCountryDtosToCountries([
        MONTENEGRO_DTO,
        PUERTO_RICO_DTO,
        SEYCHELLES_DTO,
        PHILIPPINES_DTO,
        DJIBOUTI_DTO,
      ])
    ).toEqual([DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES]);
  });
});
