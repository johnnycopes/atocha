import { mapCountryDtoToCountry } from './map-country-dto-to-country';
import { DJIBOUTI_DTO, DJIBOUTI } from '../testing';

describe('mapCountryDtoToCountry', () => {
  it('returns a country when passed a country DTO', () => {
    expect(mapCountryDtoToCountry(DJIBOUTI_DTO)).toStrictEqual(DJIBOUTI);
  });
});
