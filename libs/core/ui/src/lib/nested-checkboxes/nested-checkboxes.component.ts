/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  Input,
  TemplateRef,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { getItemsRecursively } from '@atocha/core/util';

export type CheckboxState = 'checked' | 'indeterminate';
export type CheckboxStates = Record<string, CheckboxState>;

export interface TreeProvider<T> {
  getId(item: T): string;
  getChildren(item: T): T[];
  getParent?(item: T): T | undefined;
}

interface ItemsRecord<T> {
  [id: string]: {
    item: T;
    parentId: string | undefined;
  }
}
@Component({
  selector: 'core-nested-checkboxes',
  templateUrl: './nested-checkboxes.component.html',
  styleUrls: ['./nested-checkboxes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NestedCheckboxesComponent),
      multi: true,
    },
  ],
})
export class NestedCheckboxesComponent<T> implements OnChanges, ControlValueAccessor {
  @Input() item!: T;
  @Input() getId: (item: T) => string = () => '';
  @Input() getChildren: (item: T) => T[] = () => [];
  @Input() treeProvider!: TreeProvider<T>;
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() indentation = 24;
  states: CheckboxStates = {};
  indeterminates: string[] = [];
  model: string[] = [];
  private _itemsKeyedById: ItemsRecord<T> = {};
  private _onChangeFn: (value: CheckboxStates) => void = () => ({});
  private _getParent = (item: T): T[] => {
    const parentId = this._itemsKeyedById[this.getId(item)].parentId;
    return parentId ? [this._itemsKeyedById[parentId].item] : [];
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges({ item }: SimpleChanges): void {
    if (item) {
      this._itemsKeyedById = this._createParentIdsRecord(item.currentValue);
    }
  }

  writeValue(value: CheckboxStates): void {
    if (value) {
      this.states = value;
    }
    this.changeDetectorRef.markForCheck();
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

  private _getIds(items: T[]): string[] {
    return items.map(item => this.getId(item));
  }

  private _updateItemAndDescendantStates({ item, checked, states }: {
    item: T,
    checked: boolean,
    states: CheckboxStates
  }): CheckboxStates {
    const itemAndDescendantsIds = this._getIds(getItemsRecursively(item, this.getChildren));

    itemAndDescendantsIds.forEach(id => {
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
    const ancestors = getItemsRecursively(item, this._getParent)
    ancestors.shift(); // TODO: make this unnecssary

    ancestors.forEach((ancestor) => {
      const ancestorId = this.getId(ancestor);
      const ancestorChildren = this.getChildren(ancestor);
      const ancestorChildrenStates = ancestorChildren.reduce(
        (accum, child) => {
          const childId = this.getId(child);
          const childState = states[childId];
          if (childState) {
            return {
              ...accum,
              [childState]: accum[childState] + 1,
            };
          }
          return accum;
        },
        {
          checked: 0,
          indeterminate: 0,
        } as Record<CheckboxState, number>
      );

      if (ancestorChildrenStates.checked === ancestorChildren.length) {
        states[ancestorId] = 'checked';
      } else if (ancestorChildrenStates.checked > 0 || ancestorChildrenStates.indeterminate > 0) {
        states[ancestorId] = 'indeterminate';
      } else {
        delete states[ancestorId];
      }
    });

    return states;
  }

  private _createParentIdsRecord(item: T): ItemsRecord<T> {
    const output: ItemsRecord<T> = {
      [this.getId(item)]: {
        item,
        parentId: undefined,
      }
    };
    const items = [item];

    while (items.length) {
      const current = items.shift();
      if (current) {
        const children = this.getChildren(current);
        if (children.length) {
          children.forEach(child => {
            output[this.getId(child)] = {
              item: child,
              parentId: this.getId(current),
            };
            items.push(child);
          });
        }
      }
    }

    return output;
  }
}
