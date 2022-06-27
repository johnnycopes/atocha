import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RadioButtonsOption } from '@atocha/ui-globetrotter';
import { EQuizType } from '@models/enums/quiz-type.enum';
import { SelectService } from '@services/select.service';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTypeComponent {
  public types: RadioButtonsOption<EQuizType>[] = [
    EQuizType.flagsCountries,
    EQuizType.capitalsCountries,
    EQuizType.countriesCapitals
  ].map(quizType => this._generateOption(quizType));

  public selectedType$: Observable<RadioButtonsOption<EQuizType>> = this._selectService.selection
    .pipe(
      map(({ type }) => this._generateOption(type))
    );

  constructor(private _selectService: SelectService) { }

  public onChange(selectedType: RadioButtonsOption<EQuizType>): void {
    this._selectService.updateType(selectedType.value);
  }

  private _generateOption(quizType: EQuizType): RadioButtonsOption<EQuizType> {
    return {
      display: this._getDisplayText(quizType),
      value: quizType
    };
  }

  private _getDisplayText(quizType: EQuizType): string {
    switch (quizType) {
      case EQuizType.flagsCountries:
        return "Flags / Countries";
      case EQuizType.capitalsCountries:
        return "Capitals / Countries";
      case EQuizType.countriesCapitals:
        return "Countries / Capitals";
    }
  }
}
