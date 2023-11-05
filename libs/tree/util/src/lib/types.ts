import {
  Model as InternalModel,
  ArrayModel as InternalArrayModel,
  SetModel as InternalSetModel,
  State as InternalState,
  States as InternalStates,
  Tree as InternalTree,
  GetId as InternalGetId,
  GetChildren as InternalGetChildren,
  GetLeafCount as InternalGetLeafcount,
} from './shared/types';
import { Counts as InternalCounts } from './counter/get-counts';

export type Model = InternalModel;
export type ArrayModel = InternalArrayModel;
export type SetModel = InternalSetModel;

export type State = InternalState;
export type States = InternalStates;
export type Counts = InternalCounts;

export type Tree<T> = InternalTree<T>;
export type GetId<T> = InternalGetId<Tree<T>>;
export type GetChildren<T> = InternalGetChildren<Tree<T>>;
export type GetLeafCount<T> = InternalGetLeafcount<Tree<T>>;
