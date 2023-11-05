export type Model = ArrayModel | SetModel;
export type ArrayModel = readonly string[];
export type SetModel = ReadonlySet<string>;
export function isArrayModel(model: Model): model is ArrayModel {
  return Array.isArray(model);
}

export type MutableStates = Record<string, State>;
export type States = Readonly<MutableStates>;
export type State = 'checked' | 'indeterminate';

export type Tree<T> = Readonly<T>;
export type GetId<T> = (node: Tree<T>) => string;
export type GetChildren<T> = (node: Tree<T>) => readonly Tree<T>[];
export type GetLeafCount<T> = (node: Tree<T>) => number;
