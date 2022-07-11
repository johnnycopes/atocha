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

    const itemAndDescendantsIds = this._getIds(getItemsRecursively(item, this.getChildren));
    indeterminates = indeterminates.filter(id => !itemAndDescendantsIds.includes(id));

    if (checked) {
      model = [...model, ...itemAndDescendantsIds];
    } else {
      model = model.filter(id => !itemAndDescendantsIds.includes(id));
    }

    let current: T | undefined = item;
    while (current) {
      const parent = this._getParent(current);
      if (parent) {
        const indeterminate = this._isIndeterminate(parent, model, indeterminates);
        const parentId = this.getId(parent);
        if (indeterminate) {
          indeterminates = [...indeterminates, parentId];
        } else {
          indeterminates = indeterminates.filter(id => parentId !== id);
        }
        current = parent;
      } else {
        current = undefined;
      }
    }

    this.model = dedupe(model);
    this.indeterminates = dedupe(indeterminates);
    this._onChangeFn(this.model);
  }

  private _getIds(items: T[]): string[] {
    return items.map(item => this.getId(item));
  }

  private _getParent(item: T): T | undefined {
    return this._itemsKeyedById[this.getId(item)].parent;
  }

  private _isIndeterminate(item: T, model: string[], indeterminates: string[]): boolean {
		const children = this.getChildren(item);
		if (children?.length) {
			const validChildrenIds = this._getIds(children);
			const validChildrenSelected = validChildrenIds.reduce((accum, childId) => {
				if (model.includes(childId) || indeterminates.includes(childId)) {
					return accum + 1;
				}
				return accum;
			}, 0);
			return validChildrenSelected > 0 && validChildrenSelected < validChildrenIds.length;
		}
    return false;
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
