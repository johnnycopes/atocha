import { QuizType } from './quiz-type.enum';

export interface Selection {
  type: QuizType;
  quantity: number;
  places: string[];
}

export interface SelectionParams {
  type: string;
  quantity: string;
  places: string;
}
