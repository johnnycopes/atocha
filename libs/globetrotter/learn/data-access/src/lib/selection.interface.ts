import { QuizType } from '@atocha/globetrotter/learn/util';

export interface Selection {
  type: QuizType;
  quantity: number;
  places: string[];
}
