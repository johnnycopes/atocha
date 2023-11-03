export type Model = string[] | Set<string>;
export type State = 'checked' | 'indeterminate';
export type States = Record<string, State>;

export type Tree<T> = T;
export type GetId<T> = (item: T) => string;
export type GetChildren<T> = (item: T) => readonly T[];
export type GetLeafCount<T> = (item: T) => number;
