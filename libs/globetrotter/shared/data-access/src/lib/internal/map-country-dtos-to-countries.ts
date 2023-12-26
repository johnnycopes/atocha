import { Country } from '@atocha/globetrotter/shared/util';
import { CountryDto } from './country-dto.interface';
import { mapCountryDtoToCountry } from './map-country-dto-to-country';

export function mapCountryDtosToCountries(
  countryDtos: CountryDto[]
): Country[] {
  return countryDtos
    .filter(({ unMember }) => unMember)
    .map(mapCountryDtoToCountry)
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}
