import { Component, OnInit } from '@angular/core';
import { Observable, Subject, ReplaySubject, combineLatest } from 'rxjs';
import {
  map,
  tap,
  switchMap,
  startWith,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import { fadeInAnimation } from '@atocha/globetrotter-ui';
import { CountryService } from '@atocha/data-access-globetrotter';
import { Country } from '@atocha/globetrotter-types';

interface IViewModel {
  filteredCountries: Country[];
  selectedCountry: Country;
  searchTerm: string;
  summary: string;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  animations: [fadeInAnimation],
})
export class ExploreComponent implements OnInit {
  vm$: Observable<IViewModel>;
  private countries$: Observable<Country[]>;
  private filteredCountries$: Observable<Country[]>;
  private searchTerm$: Observable<string>;
  private searchTermChange = new Subject<string>();
  private selectedCountry$: Observable<Country>;
  private selectedCountryChange = new ReplaySubject<Country>(1);
  private summary$: Observable<string>;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.initializeStreams();
    this.vm$ = combineLatest([
      this.filteredCountries$,
      this.selectedCountry$,
      this.searchTerm$,
      this.summary$,
    ]).pipe(
      map(([filteredCountries, selectedCountry, searchTerm, summary]) => ({
        filteredCountries,
        selectedCountry,
        searchTerm,
        summary,
      }))
    );
  }

  getCountryCode(country: Country): string {
    return country.cioc;
  }

  onSelect(selectedCountry: Country): void {
    this.selectedCountryChange.next(selectedCountry);
  }

  onSearch(searchTerm: string): void {
    this.searchTermChange.next(searchTerm);
  }

  private initializeStreams(): void {
    this.countries$ = this.countryService.countries.pipe(
      map(({ flatCountries }) => flatCountries)
    );
    this.selectedCountry$ = this.selectedCountryChange
      .asObservable()
      .pipe(distinctUntilChanged());
    this.summary$ = this.selectedCountryChange.asObservable().pipe(
      switchMap((country) => this.countryService.getSummary(country.name)),
      distinctUntilChanged()
    );
    this.searchTerm$ = this.searchTermChange
      .asObservable()
      .pipe(startWith(''), debounceTime(100), distinctUntilChanged());
    this.filteredCountries$ = this.searchTerm$.pipe(
      map((searchTerm) => searchTerm.toLowerCase()),
      switchMap((searchTerm, index) =>
        this.countries$.pipe(
          tap((countries) =>
            index === 0 ? this.onSelect(countries[0]) : null
          ),
          map((countries) => {
            return countries.filter((country) => {
              const name = country.name.toLowerCase();
              const capital = country.capital.toLowerCase();
              return name.includes(searchTerm) || capital.includes(searchTerm);
            });
          })
        )
      )
    );
  }
}
