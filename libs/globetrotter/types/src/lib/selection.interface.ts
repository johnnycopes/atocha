import { CheckboxStates } from './checkbox';
import { QuizType } from './quiz-type.enum';

export interface Selection {
  type: QuizType;
  quantity: number;
  places: CheckboxStates;
}

export interface SelectionParams {
  type: string;
  quantity: string;
  places: string;
}
