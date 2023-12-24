import { QuizType } from '@atocha/globetrotter/util';

export interface Selection {
  type: QuizType;
  quantity: number;
  places: string[];
}
