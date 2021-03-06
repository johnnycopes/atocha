/* eslint-disable @typescript-eslint/member-ordering */

import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';

import { InputComponent } from '../input/input.component';

export interface ListDetailsStyles {
  offsetTop: string;
  gap: string;
}

@Component({
  selector: 'ui-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDetailsComponent<T>
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() items: T[] = [];
  @Input() listItemTemplate: TemplateRef<unknown> | undefined;
  @Input() detailsTemplate: TemplateRef<unknown> | undefined;
  @Input() styles: ListDetailsStyles = {
    offsetTop: '0px',
    gap: '12px',
  };
  @Input() getItemUniqueId: (item: T) => string = () => '';
  @Input() selectedItem: T | undefined;
  @Input() searchTerm = '';
  @Input() placeholderText = '';
  @Output() selectedItemChange = new EventEmitter<T>();
  @Output() searchTermChange = new EventEmitter<string>();

  @ViewChild(InputComponent, { read: ElementRef })
  search!: ElementRef<HTMLInputElement>;

  @ViewChild('list')
  list!: ElementRef<HTMLElement>;

  @ViewChild('listItem')
  listItem!: ElementRef<HTMLElement>;

  gap = '12px';
  containerHeight = '';
  toolbarHeight = '';
  private _selectedItemIndex = 0;
  private _listItemHeight = 0;

  public trackByFn = (index: number, item: T): string => {
    return this.getItemUniqueId(item);
  };

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

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.getItemUniqueId) {
      throw new Error(
        'Missing input(s): getItemUniqueId must be passed to the list-details component'
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['selectedItem'] || changes?.['items']) {
      if (!this.selectedItem) {
        return;
      }

      this._selectedItemIndex = this.items.indexOf(this.selectedItem);
      if (this._selectedItemIndex >= 0) {
        setTimeout(() => {
          const list = this.list?.nativeElement;
          if (list) {
            list.scrollTop = this._selectedItemIndex * this._listItemHeight;
          }
        });
      }
    }
  }

  ngAfterViewInit(): void {
    this.containerHeight = `calc(100vh - ${this.styles.gap} - ${this.styles.gap} - ${this.styles.offsetTop})`;
    this.toolbarHeight = `
      calc(100vh -
      ${this.search?.nativeElement?.offsetHeight ?? 0}px -
      ${this.styles.gap} -
      ${this.styles.gap} -
      ${this.styles.gap} -
      ${this.styles.offsetTop})
    `;
    this._listItemHeight =
      this.listItem.nativeElement.offsetHeight + parseInt(this.gap);
    this.changeDetectorRef.detectChanges();
  }

  onSearch(searchTerm: string): void {
    this.searchTermChange.emit(searchTerm);
  }

  onSelect(item: T): void {
    this.selectedItemChange.emit(item);
  }

  checkIfSelected(item: T): boolean {
    if (!this.selectedItem) {
      return false;
    }
    return (
      this.getItemUniqueId(item) === this.getItemUniqueId(this.selectedItem)
    );
  }

  private _moveUpList(incrementValue: number): void {
    const newItemIndex = this._selectedItemIndex - incrementValue;
    if (newItemIndex >= 0) {
      this.onSelect(this.items[newItemIndex]);
    }
  }

  private _moveDownList(incrementValue: number): void {
    const newItemIndex = this._selectedItemIndex + incrementValue;
    if (newItemIndex < this.items.length) {
      this.onSelect(this.items[newItemIndex]);
    }
  }
}
