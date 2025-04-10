import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { SearchInputComponent, trackByFactory } from '@atocha/core/ui';
import { InputComponent } from '@atocha/globetrotter/shared/ui';
import { Country } from '@atocha/globetrotter/shared/util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nav[app-explore-countries]',
  imports: [CommonModule, InputComponent, SearchInputComponent],
  templateUrl: './explore-countries.component.html',
  styleUrls: ['./explore-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreCountriesComponent implements OnChanges {
  @Input({ required: true }) countries: Country[] = [];
  @Input({ required: true }) selectedCountry: Country | undefined;
  @Input({ required: true }) searchTerm = '';
  @Output() selectedCountryChange = new EventEmitter<Country>();
  @Output() searchTermChange = new EventEmitter<string>();

  @ViewChild('list', { static: true })
  list!: ElementRef<HTMLElement>;

  readonly trackByFn = trackByFactory<Country>(({ id }) => id);
  private _selectedCountryIndex = 0;
  private readonly _countryHeight = 60;

  @HostListener('window:keydown.arrowUp', ['$event'])
  onArrowUp(event: KeyboardEvent): void {
    event.preventDefault();
    this._moveUpList(1);
  }

  @HostListener('window:keydown.shift.arrowUp', ['$event'])
  onShiftArrowUp(event: KeyboardEvent): void {
    event.preventDefault();
    this._moveUpList(10);
  }

  @HostListener('window:keydown.arrowDown', ['$event'])
  onArrowDown(event: KeyboardEvent): void {
    event.preventDefault();
    this._moveDownList(1);
  }

  @HostListener('window:keydown.shift.arrowDown', ['$event'])
  onShiftArrowDown(event: KeyboardEvent): void {
    event.preventDefault();
    this._moveDownList(10);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['selectedCountry'] || changes?.['countries']) {
      if (!this.selectedCountry) {
        return;
      }

      this._selectedCountryIndex = this.countries.indexOf(this.selectedCountry);
      if (this._selectedCountryIndex >= 0) {
        this.list.nativeElement.scrollTop =
          this._selectedCountryIndex * this._countryHeight;
      }
    }
  }

  private _moveUpList(incrementValue: number): void {
    const newIndex = this._selectedCountryIndex - incrementValue;
    if (newIndex >= 0) {
      this.selectedCountryChange.emit(this.countries[newIndex]);
    }
  }

  private _moveDownList(incrementValue: number): void {
    const newIndex = this._selectedCountryIndex + incrementValue;
    if (newIndex < this.countries.length) {
      this.selectedCountryChange.emit(this.countries[newIndex]);
    }
  }
}
