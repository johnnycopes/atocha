import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { fadeIn } from '@atocha/globetrotter/shared/ui';
import { Country } from '@atocha/globetrotter/shared/util';
import { ExploreService } from './explore.service';
import { ExploreCountriesComponent } from './explore-countries/explore-countries.component';
import { ExploreCountryComponent } from './explore-country/explore-country.component';

@Component({
  standalone: true,
  selector: 'app-explore',
  imports: [CommonModule, ExploreCountriesComponent, ExploreCountryComponent],
  providers: [ExploreService],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class ExploreComponent {
  vm$ = this._exploreService.state$;

  constructor(private _exploreService: ExploreService) {}

  onSelect(selectedCountry: Country): void {
    this._exploreService.select(selectedCountry);
  }

  onSearch(searchTerm: string): void {
    this._exploreService.search(searchTerm);
  }
}
