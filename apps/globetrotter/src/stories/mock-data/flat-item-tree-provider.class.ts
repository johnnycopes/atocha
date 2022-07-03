import { keyBy, groupBy } from 'lodash-es';

import { TreeProvider } from '@atocha/globetrotter/ui';
import { DefaultTreeItem } from './default-tree-item';

export class FlatItemTreeProvider implements TreeProvider<DefaultTreeItem> {
  private _itemsKeyedById: Record<string, DefaultTreeItem>;
  private _itemsGroupedByParentId: Record<string, DefaultTreeItem[]>;

  constructor(items: DefaultTreeItem[]) {
    this._itemsKeyedById = keyBy(items, 'id');
    this._itemsGroupedByParentId = groupBy(items, 'parentId');
  }

  getId(item: DefaultTreeItem): string {
    return item.id;
  }

  getParent(item: DefaultTreeItem): DefaultTreeItem | undefined {
    const parentId = item.parentId;
    if (parentId) {
      return this._itemsKeyedById[parentId];
    }
    return undefined;
  }

  getChildren(item: DefaultTreeItem): DefaultTreeItem[] {
    return this._itemsGroupedByParentId[item.id] || [];
  }
}
