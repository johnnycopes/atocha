import { mapCountryDtoToCountry } from './map-country-dto-to-country';
import { DJIBOUTI_DTO } from '../testing/country-dtos';
import { DJIBOUTI } from '../testing/countries';

describe('mapCountryDtoToCountry', () => {
  it('returns a country when passed a country DTO', () => {
    expect(mapCountryDtoToCountry(DJIBOUTI_DTO)).toStrictEqual(DJIBOUTI);
  });
});
