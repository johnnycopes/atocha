import { Country } from '../../../../util/src/lib/domain/country.interface';
import { CountryDto } from '../../../../util/src/lib/dtos/country-dto.interface';

const CALLING_CODES: Record<string, string[]> = {
  'United States': ['+1'],
};

export function mapCountryDtoToCountry(dto: CountryDto): Country {
  return {
    area: dto.area,
    callingCodes:
      CALLING_CODES[dto.name.common] ||
      dto.idd.suffixes.map((suffix) => dto.idd.root + suffix),
    capital: dto.capital[0],
    currencies: Object.keys(dto.currencies),
    demonym: dto.demonyms?.['eng']?.m ?? '',
    flag: dto.flags.svg,
    id: dto.cioc ?? dto.name.common,
    languages: Object.values(dto.languages),
    name: dto.name.common,
    population: dto.population,
    region: dto.region,
    subregion: dto.subregion,
    topLevelDomain: dto.tld,
  };
}
