import { CheckboxStates, TreeProvider } from '../../src/lib/nested-checkboxes/nested-checkboxes.component';

export interface NestedItem {
  id: string;
  parentId?: string;
  children?: NestedItem[];
  targets?: number;
}

export const NESTED_ITEM: NestedItem = {
  id: 'Africa',
  children: [
    {
      id: 'Southern Africa',
      children: [{ id: 'Swaziland', targets: 28 }, { id: 'Namibia', targets: 17 }],
    },
    { id: 'Central Africa', targets: 65 },
    {
      id: 'Northern Africa',
      children: [
        {
          id: 'Morocco',
          children: [{ id: 'Marrakesh', targets: 9 }, { id: 'Fes', targets: 11 }],
        },
      ],
    },
  ],
};

export const SOME_SELECTED: CheckboxStates = {
  Africa: 'indeterminate',
  Morocco: 'indeterminate',
  'Southern Africa': 'indeterminate',
  Swaziland: 'checked',
  'Northern Africa': 'indeterminate',
  Fes: 'checked',
};

export const ALL_SELECTED: CheckboxStates = {
  Africa: 'checked',
  'Southern Africa': 'checked',
  Swaziland: 'checked',
  Namibia: 'checked',
  'Central Africa': 'checked',
  'Northern Africa': 'checked',
  Morocco: 'checked',
  Marrakesh: 'checked',
  Fes: 'checked',
};

export const getId = ({ id }: NestedItem) => id;
export const getChildren = ({ children }: NestedItem) => children ?? [];
export const getCounts = ({ targets }: NestedItem) => targets ?? 0;

export class NestedItemTreeProvider implements TreeProvider<NestedItem> {
  private _itemsKeyedById: Record<string, NestedItem> = {};

  constructor(item: NestedItem) {
    // set itemsKeyedById recursively
    const items = [item];
    while (items.length) {
      const currentItem = items.shift();
      if (currentItem) {
        const currentItemId = this.getId(currentItem);
        const currentItemChildren = this.getChildren(currentItem);
        this._itemsKeyedById[currentItemId] = currentItem;
        if (currentItemChildren.length) {
          currentItemChildren.forEach((child) => {
            items.push(child);
          });
        }
      }
    }
  }

  getId(item: NestedItem): string {
    return item.id;
  }

  getParent(item: NestedItem): NestedItem | undefined {
    const parentId = item.parentId;
    if (parentId) {
      return this._itemsKeyedById[parentId];
    }
    return undefined;
  }

  getChildren(item: NestedItem): NestedItem[] {
    return item.children || [];
  }
}
