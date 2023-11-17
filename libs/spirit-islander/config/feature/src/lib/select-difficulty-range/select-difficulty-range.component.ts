import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Options } from '@atocha/spirit-islander/util';
import { SelectRangeComponent } from '../select-range/select-range.component';

@Component({
  selector: 'app-select-difficulty-range',
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

  difficulties = Options.allDifficulties;
}
