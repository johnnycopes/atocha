import { EventEmitter, TemplateRef } from '@angular/core';
import {
  Ids,
  GetLeafCount,
  ISelectionTree,
  ICountedSelectionTree,
  ITree,
} from '@atocha/tree/util';

export interface CountedSelectionTreeComponentAPI<T>
  extends SelectionTreeComponentAPI<T> {
  getLeafCount: GetLeafCount<T>;
  selectedChange: EventEmitter<number>;
  totalChange: EventEmitter<number>;
}

export interface SelectionTreeComponentAPI<T> extends TreeComponentAPI<T> {
  nodeClick: EventEmitter<string>;
}

export interface TreeComponentAPI<T> extends ITree<T> {
  template?: TemplateRef<TreeNodeContext<T>>;
}

export interface InternalCountedSelectionTreeComponentAPI<T>
  extends InternalSelectionTreeComponentAPI<T> {
  tree: ICountedSelectionTree<T>;
  selectedChange: EventEmitter<number>;
  totalChange: EventEmitter<number>;
}

export interface InternalSelectionTreeComponentAPI<T> {
  tree: ISelectionTree<T>;
  ids: Ids;
  template?: TemplateRef<SelectionTreeNodeContext<T>>;
  changed: EventEmitter<Ids>;
  nodeClick: EventEmitter<string>;
}

export interface CountedSelectionTreeNodeContext<T>
  extends SelectionTreeNodeContext<T> {
  selected: number;
  total: number;
}

export interface SelectionTreeNodeContext<T> extends TreeNodeContext<T> {
  checked: boolean;
  indeterminate: boolean;
  onChange: (node: T) => void;
}

export interface TreeNodeContext<T> {
  $implicit: T;
  level: number;
}
