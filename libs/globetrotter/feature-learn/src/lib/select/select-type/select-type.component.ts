import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { RadioButtonsOption } from '@atocha/globetrotter/ui';
import { QuizType } from '@atocha/globetrotter/util';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTypeComponent {
  options: RadioButtonsOption<QuizType>[] = [
    QuizType.flagsCountries,
    QuizType.capitalsCountries,
    QuizType.countriesCapitals,
  ].map((quizType) => ({
    display: this._getDisplayText(quizType),
    value: quizType,
  }));

  @Input()
  set type(value: QuizType) {
    const option = this.options.find((type) => type.value === value);
    if (option) {
      this.selectedOption = { ...option };
    }
  }
  selectedOption = this.options[0];

  @Output() typeChange = new EventEmitter<QuizType>();

  private _getDisplayText(quizType: QuizType): string {
    switch (quizType) {
      case QuizType.flagsCountries:
        return 'Flags / Countries';
      case QuizType.capitalsCountries:
        return 'Capitals / Countries';
      case QuizType.countriesCapitals:
        return 'Countries / Capitals';
    }
  }
}
