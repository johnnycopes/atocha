import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import {
  map,
  tap,
  switchMap,
  startWith,
  distinctUntilChanged,
} from 'rxjs/operators';

import { includes } from '@atocha/core/util';
import { PlaceService } from '@atocha/globetrotter/data-access';
import { ListDetailsComponent, fadeInAnimation } from '@atocha/globetrotter/ui';
import { Country } from '@atocha/globetrotter/util';
import { ExploreCountryComponent } from './explore-country/explore-country.component';

@Component({
  standalone: true,
  selector: 'app-explore',
  imports: [CommonModule, ExploreCountryComponent, ListDetailsComponent],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class ExploreComponent {
  private _searchTermChange = new Subject<string>();
  private _selectedCountryChange = new BehaviorSubject<Country | undefined>(
    undefined
  );
  private _countries$ = this._placeService.places$.pipe(
    map(({ countries }) => countries)
  );
  private _selectedCountry$ = this._selectedCountryChange.pipe(
    distinctUntilChanged()
  );
  private _summary$ = this._selectedCountryChange.pipe(
    switchMap((country) => {
      if (!country) {
        return of('');
      }
      return this._placeService.getSummary(country.name);
    }),
    distinctUntilChanged()
  );
  private _searchTerm$ = this._searchTermChange.pipe(
    startWith(''),
    distinctUntilChanged()
  );
  private _filteredCountries$ = this._searchTerm$.pipe(
    switchMap((searchTerm, index) =>
      this._countries$.pipe(
        tap((countries) => (index === 0 ? this.onSelect(countries[0]) : null)),
        map((countries) =>
          countries.filter(({ name, capital }) =>
            includes([name, capital], searchTerm)
          )
        )
      )
    )
  );
  vm$ = combineLatest([
    this._filteredCountries$,
    this._selectedCountry$,
    this._searchTerm$,
    this._summary$,
  ]).pipe(
    map(([filteredCountries, selectedCountry, searchTerm, summary]) => ({
      filteredCountries,
      selectedCountry,
      searchTerm,
      summary,
    }))
  );

  constructor(private _placeService: PlaceService) {}

  getCountryId({ id }: Country): string {
    return id;
  }

  onSelect(selectedCountry: Country): void {
    this._selectedCountryChange.next(selectedCountry);
  }

  onSearch(searchTerm: string): void {
    this._searchTermChange.next(searchTerm);
  }
}
