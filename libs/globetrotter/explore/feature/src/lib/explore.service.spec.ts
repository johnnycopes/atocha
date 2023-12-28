import { of } from 'rxjs';

import { CountryService } from '@atocha/globetrotter/shared/data-access';
import { Country } from '@atocha/globetrotter/shared/util';
import { ExploreService } from './explore.service';

describe('ExploreService', () => {
  let service: ExploreService;

  beforeEach(() => {
    service = new ExploreService({
      countries$: of<Country[]>([]),
    } as CountryService);
  });

  it('renders', () => {
    expect(service).toBeTruthy();
  });
});
