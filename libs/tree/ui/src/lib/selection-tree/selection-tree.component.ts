/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';

import {
  GetChildren,
  GetId,
  Ids,
  States,
  Transformer,
} from '@atocha/tree/util';
import { TreeComponent } from '../tree/tree.component';

@Component({
  standalone: true,
  selector: 'core-selection-tree',
  imports: [CommonModule, FormsModule, TreeComponent],
  templateUrl: './selection-tree.component.html',
  styleUrls: ['./selection-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-selection-tree',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectionTreeComponent),
      multi: true,
    },
  ],
})
export class SelectionTreeComponent<T>
  implements OnChanges, ControlValueAccessor
{
  @Input() root: T | undefined;
  @Input() getId: GetId<T> = () => '';
  @Input() getChildren: GetChildren<T> = () => [];
  @Input() template: TemplateRef<unknown> | undefined;
  @Output() nodeClick = new EventEmitter<string>();
  ids: Ids = [];
  states: States = {};
  private _transformer = new Transformer<T>(
    {} as T,
    this.getId,
    this.getChildren
  );
  private _onChangeFn: (value: Ids) => void = () => [];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['root']) {
      const root: T = changes['root'].currentValue;

      this._transformer = new Transformer(
        root,
        this.getId,
        this.getChildren,
        this.ids
      );

      this.writeValue(this.ids);
    }
  }

  writeValue(ids: Ids): void {
    if (ids) {
      this.ids = ids;
      this.states = this._transformer.updateMultiple(ids).states;
    }
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: Ids) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(_fn: (value: Ids) => void): void {}

  onChange = (node: T): void => {
    const nodeId = this.getId(node);

    this.nodeClick.emit(nodeId);
    this._transformer.updateOne(nodeId);
    this.states = this._transformer.states;
    this.ids = this._transformer.array;
    this._onChangeFn(this.ids);
  };
}
