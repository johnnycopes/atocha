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

import { TreeComponent } from '../tree/tree.component';
import { CheckboxStates, ModelTransformer } from './model-transformer';

@Component({
  standalone: true,
  selector: 'core-checkbox-tree-new',
  imports: [CommonModule, FormsModule, TreeComponent],
  templateUrl: './checkbox-tree.component.html',
  styleUrls: ['./checkbox-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-checkbox-tree',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxTreeComponent),
      multi: true,
    },
  ],
})
export class CheckboxTreeComponent<T>
  implements OnChanges, ControlValueAccessor
{
  @Input() node: T | undefined;
  @Input() getId: (node: T) => string = () => '';
  @Input() getChildren: (node: T) => T[] = () => [];
  @Input() template: TemplateRef<unknown> | undefined;
  @Output() nodeClick = new EventEmitter<string>();
  model: string[] = [];
  states: CheckboxStates = {};
  private _transformer = new ModelTransformer<T>(
    {} as T,
    this.getId,
    this.getChildren
  );
  private _onChangeFn: (value: string[]) => void = () => [];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges({ node }: SimpleChanges): void {
    if (node) {
      const tree: T = node.currentValue;

      this._transformer = new ModelTransformer(
        tree,
        this.getId,
        this.getChildren
      );

      this.writeValue(this.model);
    }
  }

  writeValue(model: string[]): void {
    if (model) {
      this.model = model;
      this.states = this._transformer.toStates(model);
    }
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(_fn: (value: string[]) => void): void {}

  onChange = (checked: boolean, node: T): void => {
    const nodeId = this.getId(node);

    this.nodeClick.emit(nodeId);
    this.states = this._transformer.updateStates(checked, nodeId, this.states);
    this.model = this._transformer.toModel(this.states);
    this._onChangeFn(this.model);
  };
}
