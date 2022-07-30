import { Component, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output } from '@angular/core';

import { fadeInAnimation } from '@utility/domain/animations';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class TabComponent {
  @Input()
  set name(value: string) {
    this._name = value;
    this.nameChange.emit(value);
    this._changeDetectorRef.markForCheck();
  }
  get name(): string { return this._name; }
  private _name = '';

  @Input()
  set selected(value: boolean) {
    this._selected = value;
    this.selectedChange.emit(value);
    this._changeDetectorRef.markForCheck();
  }
  get selected(): boolean { return this._selected; }
  private _selected = false;

  @Output() nameChange = new EventEmitter<string>();
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }
}
