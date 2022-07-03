import { keyBy, groupBy } from 'lodash-es';

import { TreeProvider } from '@atocha/globetrotter/types';
import { DefaultTreeItem } from './default-tree-item';

export class FlatItemTreeProvider implements TreeProvider<DefaultTreeItem> {
  private itemsKeyedById: Record<string, DefaultTreeItem>;
  private itemsGroupedByParentId: Record<string, DefaultTreeItem[]>;

  constructor(items: DefaultTreeItem[]) {
    this.itemsKeyedById = keyBy(items, 'id');
    this.itemsGroupedByParentId = groupBy(items, 'parentId');
  }

  public getId(item: DefaultTreeItem): string {
    return item.id;
  }

  public getParent(item: DefaultTreeItem): DefaultTreeItem | undefined {
    const parentId = item.parentId;
    if (parentId) {
      return this.itemsKeyedById[parentId];
    }
    return undefined;
  }

  public getChildren(item: DefaultTreeItem): DefaultTreeItem[] {
    return this.itemsGroupedByParentId[item.id] || [];
  }
}
