import {
  Component,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  inject,
} from '@angular/core';

import { fadeInAnimation } from '../animations';

@Component({
  selector: 'ui-tab',
  imports: [],
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class TabComponent {
  private _changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  set name(value: string) {
    this._name = value;
    this.nameChange.emit(value);
    this._changeDetectorRef.markForCheck();
  }
  get name(): string {
    return this._name;
  }
  private _name = '';

  @Input()
  set selected(value: boolean) {
    this._selected = value;
    this.selectedChange.emit(value);
    this._changeDetectorRef.markForCheck();
  }
  get selected(): boolean {
    return this._selected;
  }
  private _selected = false;

  @Output() nameChange = new EventEmitter<string>();
  @Output() selectedChange = new EventEmitter<boolean>();
}
