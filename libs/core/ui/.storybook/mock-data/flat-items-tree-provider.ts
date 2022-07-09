import { groupBy, keyBy } from "lodash-es";

import { TreeProvider } from "../../src/lib/nested-checkboxes/nested-checkboxes.component";
import { Item } from "./item.interface";

export class FlatItemTreeProvider implements TreeProvider<Item> {
  private _itemsKeyedById: Record<string, Item>;
  private _itemsGroupedByParentId: Record<string, Item[]>;

  constructor(items: Item[]) {
    this._itemsKeyedById = keyBy(items, 'id');
    this._itemsGroupedByParentId = groupBy(items, 'parentId');
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
    return this._itemsGroupedByParentId[item.id] || [];
  }
}
