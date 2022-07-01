import { Dictionary } from 'lodash';
import { keyBy, groupBy } from 'lodash-es';

import { TreeProvider } from '@atocha/globetrotter/ui';
import { IDefaultTreeItem } from './default-tree-item';

export class FlatItemTreeProvider implements TreeProvider<IDefaultTreeItem> {
  private itemsKeyedById: Dictionary<IDefaultTreeItem>;
  private itemsGroupedByParentId: Dictionary<IDefaultTreeItem[]>;

  constructor(items: IDefaultTreeItem[]) {
    this.itemsKeyedById = keyBy(items, 'id');
    this.itemsGroupedByParentId = groupBy(items, 'parentId');
  }

  public getId(item: IDefaultTreeItem): string {
    return item.id;
  }

  public getParent(item: IDefaultTreeItem): IDefaultTreeItem | undefined {
    const parentId = item.parentId;
    if (parentId) {
      return this.itemsKeyedById[parentId];
    }
    return undefined;
  }

  public getChildren(item: IDefaultTreeItem): IDefaultTreeItem[] {
    return this.itemsGroupedByParentId[item.id] || [];
  }
}
