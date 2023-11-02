import {
  Model as InternalModel,
  State as InternalState,
  States as InternalStates,
  Tree as InternalTree,
  GetId as InternalGetId,
  GetChildren as InternalGetChildren,
  GetLeafCount as InternalGetLeafcount,
} from './internal/types';
import { Counts as InternalCounts } from './internal/get-counts';

export type Model = InternalModel;
export type State = InternalState;
export type States = InternalStates;
export type Counts = InternalCounts;

export type Tree<T> = InternalTree<T>;
export type GetId<T> = InternalGetId<T>;
export type GetChildren<T> = InternalGetChildren<T>;
export type GetLeafCount<T> = InternalGetLeafcount<T>;
