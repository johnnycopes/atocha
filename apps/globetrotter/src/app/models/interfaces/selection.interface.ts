import { CheckboxStates } from '@atocha/ui-globetrotter';
import { EQuizType } from '../enums/quiz-type.enum';

export interface ISelection {
  type: EQuizType;
  quantity: number;
  countries: CheckboxStates;
}

export interface ISelectionParams {
  type: string;
  quantity: string;
  countries: string;
}
