import { QuizType } from './quiz-type.enum';

export interface Selection {
  type: QuizType;
  quantity: number;
  places: PlaceSelection;
}

export interface SelectionParams {
  type: string;
  quantity: string;
  places: string;
}

export type PlaceSelection = Record<string, PlaceSelectionState>;
export type PlaceSelectionState = 'checked' | 'indeterminate';
