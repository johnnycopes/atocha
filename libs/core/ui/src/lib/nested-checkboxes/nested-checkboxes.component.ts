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
import { dedupe, getItemsRecursively } from '@atocha/core/util';

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';

export type CheckboxStates = Record<string, CheckboxState>;

export interface TreeProvider<T> {
  getId(item: T): string;
  getChildren(item: T): T[];
  getParent?(item: T): T | undefined;
}

interface ItemsRecord<T> {
  [id: string]: {
    parent: T | undefined;
    item: T;
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
  indeterminates: string[] = [];
  model: string[] = [];
  private _itemsKeyedById: ItemsRecord<T> = {};
  private _onChangeFn: (value: string[]) => void = () => ({});
  private _getParent = (item: T) => {
    const parent = this._itemsKeyedById[this.getId(item)].parent;
    return parent ? [parent] : [];
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges({ item }: SimpleChanges): void {
    if (item) {
      this._itemsKeyedById = this._createParentIdsRecord(item.currentValue);
    }
  }

  writeValue(value: string[]): void {
    if (value) {
      this.model = value;
    }
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(_fn: (value: string[]) => void): void {}

  onChange(checked: boolean, item: T): void {
    let model = [...this.model];
    let indeterminates = [...this.indeterminates];

    // Item and all descendants become either checked or unchecked and they lose any indeterminate status
    const itemAndDescendantsIds = this._getIds(getItemsRecursively(item, this.getChildren));
    indeterminates = indeterminates.filter(id => !itemAndDescendantsIds.includes(id));

    if (checked) {
      model = [...model, ...itemAndDescendantsIds];
    } else {
      model = model.filter(id => !itemAndDescendantsIds.includes(id));
    }

    // Ancestors can change to checked, unchecked, or indeterminate
    const ancestors = getItemsRecursively(item, this._getParent)
    ancestors.shift();

    ancestors.forEach(ancestor => {
      const childrenIds = this._getIds(this.getChildren(ancestor));
      const childrenStates = childrenIds.reduce(
        (accum, childId) => {
          if (model.includes(childId)) {
            return { ...accum, checked: accum.checked + 1 };
          } else if (indeterminates.includes(childId)) {
            return { ...accum, indeterminate: accum.indeterminate + 1 };
          }
          return { ...accum, unchecked: accum.unchecked + 1 };
        }, {
          checked: 0,
          indeterminate: 0,
          unchecked: 0,
        }
      );

      const ancestorId = this.getId(ancestor);
      if (childrenStates.checked === childrenIds.length) {
        model = [...model, ancestorId];
        indeterminates = indeterminates.filter(id => ancestorId !== id);
      } else if (childrenStates.unchecked === childrenIds.length) {
        model = model.filter(id => ancestorId !== id);
        indeterminates = indeterminates.filter(id => ancestorId !== id);
      } else {
        indeterminates = [...indeterminates, ancestorId];
      }
    });

    this.model = dedupe(model);
    this.indeterminates = dedupe(indeterminates);
    this._onChangeFn(this.model);
  }

  private _getIds(items: T[]): string[] {
    return items.map(item => this.getId(item));
  }

  private _createParentIdsRecord(item: T): ItemsRecord<T> {
    const output: ItemsRecord<T> = {
      [this.getId(item)]: {
        parent: undefined,
        item,
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
              parent: current,
              item: child,
            };
            items.push(child);
          });
        }
      }
    }

    return output;
  }
}
