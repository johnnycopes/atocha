import { QuizType } from './quiz-type.enum';

export interface Selection {
  type: QuizType;
  quantity: number;
  model: string[];
}

export interface SelectionParams {
  type: string;
  quantity: string;
  model: string;
}
