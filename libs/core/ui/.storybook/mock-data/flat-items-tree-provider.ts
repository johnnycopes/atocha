import { groupBy, keyBy } from "lodash-es";

import { TreeProvider } from "../../src/lib/nested-checkboxes/nested-checkboxes.component";
import { Item } from "./item.interface";

export class FlatItemsTreeProvider implements TreeProvider<Item> {
  constructor(items: Item[]) {
    this.getParent = ({ parentId }: Item) => parentId ? keyBy(items, 'id')[parentId] : undefined;
    this.getChildren = ({ id }: Item) => groupBy(items, 'parentId')[id] || [];
  }

  getParent: (item: Item) => Item | undefined;
  getChildren: (item: Item) => Item[];

  getId(item: Item): string {
    return item.id;
  }
}
