import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { createArray } from '@atocha/core/util';
import { Difficulty } from '@atocha/spirit-islander/util';
import { SelectRangeComponent } from '../select-range/select-range.component';

@Component({
  selector: 'ui-select-difficulty-range',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectRangeComponent,
  ],
  templateUrl: './select-difficulty-range.component.html',
  styleUrls: ['./select-difficulty-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDifficultyRangeComponent {
  @Input() form: FormGroup | undefined;

  difficulties = createArray(11, 0) as Difficulty[];
}
