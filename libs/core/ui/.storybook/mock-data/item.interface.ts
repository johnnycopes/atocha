export interface Item {
  id: string;
  parentId?: string;
  children?: Item[];
}
