import { CheckboxStates } from './checkbox';
import { QuizType } from './quiz-type.enum';

export interface Selection {
  type: QuizType;
  quantity: number;
  countries: CheckboxStates;
}

export interface SelectionParams {
  type: string;
  quantity: string;
  countries: string;
}
