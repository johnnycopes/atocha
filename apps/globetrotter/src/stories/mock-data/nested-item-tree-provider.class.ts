import { Dictionary } from 'lodash';

import { TreeProvider } from '@atocha/globetrotter/ui';
import { DefaultTreeItem } from './default-tree-item';

export class NestedItemTreeProvider implements TreeProvider<DefaultTreeItem> {
  private itemsKeyedById: Dictionary<DefaultTreeItem> = {};

  constructor(item: DefaultTreeItem) {
    // set itemsKeyedById recursively
    const items = [item];
    while (items.length) {
      const currentItem = items.shift();
      if (currentItem) {
        const currentItemId = this.getId(currentItem);
        const currentItemChildren = this.getChildren(currentItem);
        this.itemsKeyedById[currentItemId] = currentItem;
        if (currentItemChildren.length) {
          currentItemChildren.forEach((child) => {
            items.push(child);
          });
        }
      }
    }
  }

  getId(item: DefaultTreeItem): string {
    return item.id;
  }

  getParent(item: DefaultTreeItem): DefaultTreeItem | undefined {
    const parentId = item.parentId;
    if (parentId) {
      return this.itemsKeyedById[parentId];
    }
    return undefined;
  }

  getChildren(item: DefaultTreeItem): DefaultTreeItem[] {
    return item.children || [];
  }
}
