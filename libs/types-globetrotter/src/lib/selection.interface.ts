import { CheckboxStates } from '@atocha/ui-globetrotter';
import { QuizType } from './quiz-type.enum';

export interface Selection {
  type: QuizType;
  quantity: number;
  countries: CheckboxStates; // TODO: dissolve CheckboxStates
}

export interface SelectionParams {
  type: string;
  quantity: string;
  countries: string;
}
