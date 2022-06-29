export interface TreeProvider<T> {
  getId(item: T): string;
  getChildren(item: T): T[];
  getParent?(item: T): T | undefined;
}
