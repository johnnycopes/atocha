import { mapCountryDtoToCountry } from './map-country-dto-to-country';
import { DJIBOUTI_DTO } from './mock-data/country-dtos';
import { DJIBOUTI } from './mock-data/countries';

describe('mapCountryDtoToCountry', () => {
  it('returns a country when passed a country DTO', () => {
    expect(mapCountryDtoToCountry(DJIBOUTI_DTO)).toEqual(DJIBOUTI);
  });
});
