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

import { States, Transformer } from '@atocha/tree/util';
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
  @Input() tree: T | undefined;
  @Input() getId: (node: T) => string = () => '';
  @Input() getChildren: (node: T) => T[] = () => [];
  @Input() template: TemplateRef<unknown> | undefined;
  @Output() nodeClick = new EventEmitter<string>();
  model: string[] = [];
  states: States = {};
  private _transformer = new Transformer<T>(
    {} as T,
    this.getId,
    this.getChildren
  );
  private _onChangeFn: (value: string[]) => void = () => [];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tree']) {
      const tree: T = changes['tree'].currentValue;

      this._transformer = new Transformer(
        tree,
        this.getId,
        this.getChildren,
        this.model
      );

      this.writeValue(this.model);
    }
  }

  writeValue(model: string[]): void {
    if (model) {
      this.model = model;
      this.states = this._transformer.updateMultiple(model).states;
    }
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(_fn: (value: string[]) => void): void {}

  onChange = (node: T): void => {
    const nodeId = this.getId(node);

    this.nodeClick.emit(nodeId);
    this._transformer.updateOne(nodeId);
    this.states = this._transformer.states;
    this.model = this._transformer.array;
    this._onChangeFn(this.model);
  };
}