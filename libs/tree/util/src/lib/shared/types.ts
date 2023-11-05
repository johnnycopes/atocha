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
export type GetId<T> = (item: T) => string;
export type GetChildren<T> = (item: T) => readonly T[];
export type GetLeafCount<T> = (item: T) => number;
