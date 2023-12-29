import { mapCountryDtosToCountries } from './map-country-dtos-to-countries';
import {
  DJIBOUTI_DTO,
  MONTENEGRO_DTO,
  PHILIPPINES_DTO,
  PUERTO_RICO_DTO,
  SEYCHELLES_DTO,
} from '../testing/country-dtos';
import {
  DJIBOUTI,
  MONTENEGRO,
  PHILIPPINES,
  SEYCHELLES,
} from '../testing/countries';

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
    ).toStrictEqual([DJIBOUTI, MONTENEGRO, PHILIPPINES, SEYCHELLES]);
  });
});
