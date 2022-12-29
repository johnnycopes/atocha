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
  private _itemsKeyedById: ItemsRecord<T> = {};
  private _onChangeFn: (value: string[]) => void = () => [];
  private _getParent = (item: T): T[] => {
    const parentId = this._itemsKeyedById[this.getId(item)].parentId;
    return parentId ? [this._itemsKeyedById[parentId].item] : [];
  };
  private _idsMap = new Map<string, string[]>();
  private _ids: string[] = [];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges({ item }: SimpleChanges): void {
    if (item) {
      this._itemsKeyedById = this._createItemsRecord(item.currentValue);

      this._idsMap = reduceRecursively({
        item: item.currentValue as T,
        getItems: this.getChildren,
        initialValue: new Map<string, string[]>(),
        reducer: (accum, curr) =>
          accum.set(
            this.getId(curr),
            this.getChildren(curr).length
              ? this.getChildren(curr).map((child) => this.getId(child))
              : []
          ),
      });

      // Reverse the keys because we want to ascend the tree starting from the leaf nodes
      this._ids = Array.from(this._idsMap.keys()).reverse();
    }
  }

  writeValue(model: string[]): void {
    if (model) {
      this.model = model;
      this.states = this._ids.reduce((state, curr) => {
        if (model.includes(curr)) {
          state[curr] = 'checked';
        } else {
          const ids = this._idsMap.get(curr) ?? [];
          if (ids.length) {
            const idsInState = ids.reduce(
              (total, id) => total + (state[id] ? 1 : 0),
              0
            );
            const totalIds = ids.length;

            if (totalIds === 1 && state[ids[0]] === 'indeterminate') {
              state[curr] = 'indeterminate';
            } else if (totalIds === idsInState) {
              state[curr] = 'checked';
            } else if (idsInState > 0) {
              state[curr] = 'indeterminate';
            }
          }
        }
        return state;
      }, {} as Record<string, CheckboxState>);
    }
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(_fn: (value: string[]) => void): void {}

  onChange(checked: boolean, item: T): void {
    let states = { ...this.states };

    states = this._updateItemAndDescendantStates({ item, checked, states });
    states = this._updateAncestorStates(item, states);

    this.states = states;

    this.model = this._ids.reduce((state, id) => {
      if (
        this.states[id] === 'checked' &&
        !(this._idsMap.get(id) ?? []).length
      ) {
        state.unshift(id);
      }
      return state;
    }, [] as string[]);
    this._onChangeFn(this.model);
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

  private _createItemsRecord(item: T): ItemsRecord<T> {
    return reduceRecursively<T, ItemsRecord<T>>({
      item,
      getItems: this.getChildren,
      reducer: (accumulator, item, parent) => ({
        ...accumulator,
        [this.getId(item)]: {
          item,
          parentId: parent ? this.getId(parent) : undefined,
        },
      }),
      initialValue: {},
    });
  }
}
