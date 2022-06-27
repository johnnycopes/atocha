import { Dictionary } from 'lodash';

import { TreeProvider } from '@atocha/ui-globetrotter';
import { IDefaultTreeItem } from './default-tree-item';

export class NestedItemTreeProvider implements TreeProvider<IDefaultTreeItem> {
  private itemsKeyedById: Dictionary<IDefaultTreeItem> = {};

  constructor(item: IDefaultTreeItem) {
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

  getId(item: IDefaultTreeItem): string {
    return item.id;
  }

  getParent(item: IDefaultTreeItem): IDefaultTreeItem | undefined {
    const parentId = item.parentId;
    if (parentId) {
      return this.itemsKeyedById[parentId];
    }
    return undefined;
  }

  getChildren(item: IDefaultTreeItem): IDefaultTreeItem[] {
    return item.children || [];
  }
}
