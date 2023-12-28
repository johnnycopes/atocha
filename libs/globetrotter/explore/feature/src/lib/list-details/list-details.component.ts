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
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { SearchInputComponent, trackByFactory } from '@atocha/core/ui';
import { InputComponent } from '@atocha/globetrotter/shared/ui';
import { Country } from '@atocha/globetrotter/shared/util';

@Component({
  standalone: true,
  selector: 'app-list-details',
  imports: [CommonModule, InputComponent, SearchInputComponent],
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDetailsComponent implements OnChanges {
  @Input() items: Country[] = [];
  @Input() listItemTemplate: TemplateRef<unknown> | undefined;
  @Input() detailsTemplate: TemplateRef<unknown> | undefined;
  @Input() selectedItem: Country | undefined;
  @Input() searchTerm = '';
  @Output() selectedItemChange = new EventEmitter<Country>();
  @Output() searchTermChange = new EventEmitter<string>();

  @ViewChild('list', { static: true })
  list!: ElementRef<HTMLElement>;

  readonly _getCountryId: (country: Country) => string = ({ id }) => id;
  readonly trackByFn = trackByFactory(this._getCountryId);
  private _selectedItemIndex = 0;
  private readonly _listItemHeight = 60;

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
    if (changes?.['selectedItem'] || changes?.['items']) {
      if (!this.selectedItem) {
        return;
      }

      this._selectedItemIndex = this.items.indexOf(this.selectedItem);
      if (this._selectedItemIndex >= 0) {
        setTimeout(() => {
          this.list.nativeElement.scrollTop =
            this._selectedItemIndex * this._listItemHeight;
        });
      }
    }
  }

  checkIfSelected(item: Country): boolean {
    if (!this.selectedItem) {
      return false;
    }
    return this._getCountryId(item) === this._getCountryId(this.selectedItem);
  }

  private _moveUpList(incrementValue: number): void {
    const newItemIndex = this._selectedItemIndex - incrementValue;
    if (newItemIndex >= 0) {
      this.selectedItemChange.emit(this.items[newItemIndex]);
    }
  }

  private _moveDownList(incrementValue: number): void {
    const newItemIndex = this._selectedItemIndex + incrementValue;
    if (newItemIndex < this.items.length) {
      this.selectedItemChange.emit(this.items[newItemIndex]);
    }
  }
}
