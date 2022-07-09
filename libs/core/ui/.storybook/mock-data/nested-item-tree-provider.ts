import { Item } from "./item.interface";
import { TreeProvider } from "../../src/lib/nested-checkboxes/nested-checkboxes.component";

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
