import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RadioButtonsOption } from '@atocha/globetrotter-ui';
import { QuizType } from '@atocha/types-globetrotter';
import { SelectService } from '@atocha/data-access-globetrotter';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTypeComponent {
  public types: RadioButtonsOption<QuizType>[] = [
    QuizType.flagsCountries,
    QuizType.capitalsCountries,
    QuizType.countriesCapitals,
  ].map((quizType) => this._generateOption(quizType));

  public selectedType$: Observable<RadioButtonsOption<QuizType>> =
    this._selectService.selection.pipe(
      map(({ type }) => this._generateOption(type))
    );

  constructor(private _selectService: SelectService) {}

  public onChange(selectedType: RadioButtonsOption<QuizType>): void {
    this._selectService.updateType(selectedType.value);
  }

  private _generateOption(quizType: QuizType): RadioButtonsOption<QuizType> {
    return {
      display: this._getDisplayText(quizType),
      value: quizType,
    };
  }

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
