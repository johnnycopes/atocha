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
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';

import {
  CheckboxComponent,
  CheckboxSize,
} from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { ModelTransformer } from './model-transformer';

export type CheckboxState = 'checked' | 'indeterminate';
export type CheckboxStates = Record<string, CheckboxState>;

@Component({
  standalone: true,
  selector: 'core-checkbox-tree-new',
  imports: [CheckboxComponent, CommonModule, FormsModule, TreeComponent],
  templateUrl: './checkbox-tree-new.component.html',
  styleUrls: ['./checkbox-tree-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-checkbox-tree',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxTreeNewComponent),
      multi: true,
    },
  ],
})
export class CheckboxTreeNewComponent<T>
  implements OnChanges, ControlValueAccessor
{
  @Input() item: T | undefined;
  @Input() getId: (item: T) => string = () => '';
  @Input() getChildren: (item: T) => T[] = () => [];
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() size: CheckboxSize = 'normal';
  @Input() indentation = 24;
  model: string[] = [];
  states: CheckboxStates = {};
  private _transformer = new ModelTransformer<T>(
    {} as T,
    this.getId,
    this.getChildren
  );
  private _onChangeFn: (value: string[]) => void = () => [];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges({ item }: SimpleChanges): void {
    if (item) {
      const tree: T = item.currentValue;

      this._transformer = new ModelTransformer(
        tree,
        this.getId,
        this.getChildren
      );
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

  onChange(checked: boolean, item: T): void {
    this.states = this._transformer.updateStates(checked, item, this.states);
    this.model = this._transformer.toModel(this.states);
    this._onChangeFn(this.model);
  }
}
