import { QuizType } from '@atocha/globetrotter/shared/util';

export interface Selection {
  type: QuizType;
  quantity: number;
  places: string[];
}
