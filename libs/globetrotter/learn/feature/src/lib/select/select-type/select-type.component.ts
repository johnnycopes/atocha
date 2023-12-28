import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SmallCapsComponent } from '@atocha/globetrotter/shared/ui';
import { QuizType } from '@atocha/globetrotter/learn/util';
import { SelectForm } from '../select-form';

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

  readonly options: readonly { display: string; value: QuizType }[] = [
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
}
