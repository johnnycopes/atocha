import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { fadeInAnimation } from '@atocha/globetrotter/shared/ui';
import { Country } from '@atocha/globetrotter/shared/util';
import { ExploreService } from './explore.service';
import { ExploreCountryComponent } from './explore-country/explore-country.component';
import { ListDetailsComponent } from './list-details/list-details.component';

@Component({
  standalone: true,
  selector: 'app-explore',
  imports: [CommonModule, ExploreCountryComponent, ListDetailsComponent],
  providers: [ExploreService],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class ExploreComponent {
  vm$ = this._exploreService.vm$;

  constructor(private _exploreService: ExploreService) {}

  getCountryId({ id }: Country): string {
    return id;
  }

  onSelect(selectedCountry: Country): void {
    this._exploreService.onSelect(selectedCountry);
  }

  onSearch(searchTerm: string): void {
    this._exploreService.onSearch(searchTerm);
  }
}
