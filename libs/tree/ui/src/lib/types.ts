import { EventEmitter, TemplateRef } from '@angular/core';
import {
  GetId,
  GetChildren,
  ITree,
  Ids,
  GetLeafCount,
  CountedSelectionTree,
  ISelectionTree,
  ICountedSelectionTree,
} from '@atocha/tree/util';

export interface CountedSelectionTreeComponentAPI<T>
  extends SelectionTreeComponentAPI<T> {
  getLeafNodeCount: GetLeafCount<T>;
  selectedChange: EventEmitter<number>;
  totalChange: EventEmitter<number>;
}

export interface SelectionTreeComponentAPI<T> extends TreeComponentAPI<T> {
  nodeClick: EventEmitter<string>;
}

export interface TreeComponentAPI<T> {
  root: T | undefined;
  getId: GetId<T>;
  getChildren: GetChildren<T>;
  template?: TemplateRef<unknown> | undefined;
}

export interface InternalCountedSelectionTreeComponentAPI<T>
  extends InternalSelectionTreeComponentAPI<T> {
  tree: ICountedSelectionTree<T>;
  selectedChange: EventEmitter<number>;
  totalChange: EventEmitter<number>;
}

export interface InternalSelectionTreeComponentAPI<T>
  extends InternalTreeComponentAPI<T> {
  tree: ISelectionTree<T>;
  ids: Ids;
  changed: EventEmitter<Ids>;
  nodeClick: EventEmitter<string>;
}

export interface InternalTreeComponentAPI<T> {
  tree: ITree<T>;
  template?: TemplateRef<unknown> | undefined;
}
