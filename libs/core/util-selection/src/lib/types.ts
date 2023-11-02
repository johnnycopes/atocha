import {
  Model as InternalModel,
  State as InternalState,
  States as InternalStates,
} from './internal/types';
import { Counts as InternalCounts } from './internal/get-counts';

export type Model = InternalModel;
export type State = InternalState;
export type States = InternalStates;
export type Counts = InternalCounts;

export type GetId<T> = (item: T) => string;
export type GetChildren<T> = (item: T) => readonly T[];
export type GetLeafCount<T> = (item: T) => number;
