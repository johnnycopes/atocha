/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

// interface NestedCheckboxItem {
//   id: string;
//   parentId?: string;
//   children?: NestedCheckboxItem[];
// }

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
export class NestedCheckboxesComponent<T> implements ControlValueAccessor {
  @Input()
  set item(value: T | undefined) {
    if (!value) {
      throw new Error('Item must be defined');
    }
    console.log(value);
    this._item = value;
  };
  get item(): T {
    return this._item;
  }
  private _item!: T;
  @Input() getId: (item: T) => string = () => '';
  @Input() getChildren: (item: T) => T[] = () => [];
  @Input() treeProvider!: TreeProvider<T>;
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() indentation = 24;
  model: string[] = [];
  private _onChangeFn: (value: string[]) => void = () => ({});

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

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

  isIndeterminate(item: T, model: string[]): boolean {
    const children = this.getChildren(item);

		if (children?.length) {
			const validChildrenIds = this._getIds(children);
			const validChildrenSelected = validChildrenIds.reduce((accum, childId) => {
				if (model.includes(childId)) {
					return accum + 1;
				}
				return accum;
			}, 0);
			return validChildrenSelected > 0 && validChildrenSelected < validChildrenIds.length;
		}

    return false;
  }

  private _getIds(items: T[]): string[] {
    return items.map(item => this.getId(item));
  }

  onChange(checked: boolean, item: T): void {
    const items = getItemsRecursively(item, this.getChildren);
		const ids = this._getIds(items);
		let updatedModel: string[];

		if (checked) {
			updatedModel = [...this.model, ...ids];
		} else {
			updatedModel = this.model.filter(modelValue => !ids.includes(modelValue));
		}

    this._onChangeFn(updatedModel);
  }

  // private _onChildrenChange(model: string[], parent: T): void {
	// 	const children = this.getChildren(parent);
	// 	const ids = this._getIds(children);
	// 	const parentId = this.getId(parent);
	// 	let updatedModel: string[];

	// 	if (ids.every(id => model.includes(id))) {
	// 		updatedModel = [...model, parentId];
	// 	} else {
	// 		updatedModel = model.filter(modelValue => modelValue !== parentId);
	// 	}

  //   this._onChangeFn(dedupe(updatedModel))
	// }
}
