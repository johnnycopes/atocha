import { GetChildren, GetId } from './shared/types';

export interface ITree<T> {
  root: Readonly<T>;
  getId: GetId<T>;
  getChildren: GetChildren<T>;
}

export class Tree<T> implements ITree<T> {
  constructor(
    private _root: T,
    readonly getId: GetId<T>,
    readonly getChildren: GetChildren<T>
  ) {}

  get root(): Readonly<T> {
    return this._root;
  }
}
