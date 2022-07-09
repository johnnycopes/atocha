import {
  CheckboxStates,
  TreeProvider,
} from '../src/lib/nested-checkboxes/nested-checkboxes.component';

export interface Item {
  id: string;
  parentId?: string;
  children?: Item[];
}

export const ITEM: Item = {
  id: 'Africa',
  children: [
    {
      id: 'Southern Africa',
      parentId: 'Africa',
      children: [
        {
          id: 'Swaziland',
          parentId: 'Southern Africa',
        },
        {
          id: 'Namibia',
          parentId: 'Southern Africa',
        },
      ],
    },
    {
      id: 'Central Africa',
      parentId: 'Africa',
    },
    {
      id: 'Northern Africa',
      parentId: 'Africa',
      children: [
        {
          id: 'Morocco',
          parentId: 'Northern Africa',
          children: [
            {
              id: 'Marrakesh',
              parentId: 'Morocco',
            },
            {
              id: 'Fes',
              parentId: 'Morocco',
            },
          ],
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

export class NestedItemTreeProvider implements TreeProvider<Item> {
  private _itemsKeyedById: Record<string, Item> = {};

  constructor(item: Item) {
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

  getId(item: Item): string {
    return item.id;
  }

  getParent(item: Item): Item | undefined {
    const parentId = item.parentId;
    if (parentId) {
      return this._itemsKeyedById[parentId];
    }
    return undefined;
  }

  getChildren(item: Item): Item[] {
    return item.children || [];
  }
}
