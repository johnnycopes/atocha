import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { trackByFactory } from '@atocha/core/ui';
import { SmallCapsComponent } from '@atocha/globetrotter/shared/ui';
import { QuizType } from '@atocha/globetrotter/learn/util';
import { SelectForm } from '../select-form';

interface RadioButton {
  display: string;
  value: QuizType;
}

@Component({
  standalone: true,
  selector: 'app-select-type',
  imports: [CommonModule, ReactiveFormsModule, SmallCapsComponent],
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTypeComponent {
  @Input({ required: true }) form!: SelectForm;

  readonly options: readonly RadioButton[] = [
    {
      display: 'Flags / Countries',
      value: QuizType.flagsCountries,
    },
    {
      display: 'Capitals / Countries',
      value: QuizType.capitalsCountries,
    },
    {
      display: 'Countries / Capitals',
      value: QuizType.countriesCapitals,
    },
  ];
  readonly trackByFn = trackByFactory<RadioButton>(({ value }) =>
    value.toString()
  );
}
