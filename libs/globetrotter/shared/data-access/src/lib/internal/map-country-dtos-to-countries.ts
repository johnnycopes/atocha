import { Country } from '@atocha/globetrotter/shared/util';
import { CountryDto } from './country-dto.interface';
import { mapCountryDtoToCountry } from './map-country-dto-to-country';
import { sort } from './sort';

export function mapCountryDtosToCountries(
  countryDtos: CountryDto[]
): Country[] {
  return sort(
    countryDtos.filter(({ unMember }) => unMember).map(mapCountryDtoToCountry),
    ({ name }) => name
  );
}
