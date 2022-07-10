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
import { dedupe } from '@atocha/core/util';

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

  isIndeterminate(item: T): boolean {
		const children = this.getChildren(item);
		if (children?.length) {
			const validChildrenIds = this._getIds(children);
			const validChildrenSelected = validChildrenIds.reduce((accum, childId) => {
				if (this.model.includes(childId)) {
					return accum + 1;
				}
				return accum;
			}, 0);
			return validChildrenSelected > 0 && validChildrenSelected < validChildrenIds.length;
		}
    return false;
  }

  onChange(checked: boolean, item: T): void {
    const parent = this._itemsKeyedById[this.getId(item)].parent;
    let model = [...this.model];

    if (!parent) {
      model = checked ? Object.keys(this._itemsKeyedById) : [];
    } else {
      const id = this.getId(item);
      const ids = this._getIds(this.getChildren(parent));
      const parentId = this.getId(parent);

      model = checked ? [...model, id] : model.filter(modelId => modelId !== id);

      if (ids.every(id => model.includes(id))) {
        model = [...model, parentId];
      } else {
        model = model.filter(modelValue => modelValue !== parentId);
      }
    }

    this.model = dedupe(model);
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
