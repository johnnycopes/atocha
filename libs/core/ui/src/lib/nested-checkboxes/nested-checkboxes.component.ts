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

import { reduceRecursively } from '@atocha/core/util';
import {
  CheckboxComponent,
  CheckboxSize,
} from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';

export type CheckboxState = 'checked' | 'indeterminate';
export type CheckboxStates = Record<string, CheckboxState>;

type ItemsRecord<T> = Record<string, { item: T; parentId: string | undefined }>;

@Component({
  standalone: true,
  selector: 'core-nested-checkboxes',
  imports: [CheckboxComponent, CommonModule, FormsModule, TreeComponent],
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-nested-checkboxes',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NestedCheckboxesComponent),
      multi: true,
    },
  ],
})
export class NestedCheckboxesComponent<T>
  implements OnChanges, ControlValueAccessor
{
  @Input() item: T | undefined;
  @Input() getId: (item: T) => string = () => '';
  @Input() getChildren: (item: T) => T[] = () => [];
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() size: CheckboxSize = 'normal';
  @Input() indentation = 24;
  states: CheckboxStates = {};
  private _itemsKeyedById: ItemsRecord<T> = {};
  private _onChangeFn: (value: CheckboxStates) => void = () => ({});
  private _getParent = (item: T): T[] => {
    const parentId = this._itemsKeyedById[this.getId(item)].parentId;
    return parentId ? [this._itemsKeyedById[parentId].item] : [];
  };

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges({ item }: SimpleChanges): void {
    if (item) {
      this._itemsKeyedById = this._createdItemsRecord(item.currentValue);
    }
  }

  writeValue(value: CheckboxStates): void {
    if (value) {
      this.states = value;
    }
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: CheckboxStates) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(_fn: (value: CheckboxStates) => void): void {}

  onChange(checked: boolean, item: T): void {
    let states = { ...this.states };

    states = this._updateItemAndDescendantStates({ item, checked, states });
    states = this._updateAncestorStates(item, states);

    this.states = states;
    this._onChangeFn(this.states);
  }

  private _updateItemAndDescendantStates({
    item,
    checked,
    states,
  }: {
    item: T;
    checked: boolean;
    states: CheckboxStates;
  }): CheckboxStates {
    const itemAndDescendantsIds = reduceRecursively({
      item,
      getItems: this.getChildren,
      initialValue: [] as string[],
      reducer: (accum, item) => [...accum, this.getId(item)],
    });

    itemAndDescendantsIds.forEach((id) => {
      if (checked) {
        states[id] = 'checked';
      } else {
        delete states[id];
      }
    });

    return states;
  }

  private _updateAncestorStates(
    item: T,
    states: CheckboxStates
  ): CheckboxStates {
    const ancestors = reduceRecursively({
      item,
      getItems: this._getParent,
      initialValue: [] as T[],
      reducer: (accum, curr) =>
        this.getId(item) === this.getId(curr) ? [...accum] : [...accum, curr],
    });

    ancestors.forEach((ancestor) => {
      const ancestorId = this.getId(ancestor);
      const ancestorChildren = this.getChildren(ancestor);
      const ancestorChildrenStates: Record<CheckboxState, number> = {
        checked: 0,
        indeterminate: 0,
      };

      ancestorChildren.forEach((child) => {
        const childId = this.getId(child);
        const childState = states[childId];
        if (childState) {
          ancestorChildrenStates[childState]++;
        }
      });

      if (ancestorChildrenStates.checked === ancestorChildren.length) {
        states[ancestorId] = 'checked';
      } else if (
        ancestorChildrenStates.checked > 0 ||
        ancestorChildrenStates.indeterminate > 0
      ) {
        states[ancestorId] = 'indeterminate';
      } else {
        delete states[ancestorId];
      }
    });

    return states;
  }

  private _createdItemsRecord(item: T): ItemsRecord<T> {
    const reducer = (
      accumulator: ItemsRecord<T>,
      item: T,
      parent?: T
    ): ItemsRecord<T> => ({
      ...accumulator,
      [this.getId(item)]: {
        item,
        parentId: parent ? this.getId(parent) : undefined,
      },
    });

    return reduceRecursively({
      item,
      getItems: this.getChildren,
      reducer,
      initialValue: {},
    });
  }
}
