import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { trackBySelf } from '@atocha/core/ui';
import {
  InlineFormComponent,
  InputComponent,
} from '@atocha/menu-matriarch/ui-generic';
import { getIngredientTypes } from '@atocha/menu-matriarch/util';

@Component({
  standalone: true,
  selector: 'app-inline-type-select',
  imports: [CommonModule, FormsModule, InlineFormComponent, InputComponent],
  templateUrl: './inline-type-select.component.html',
  styleUrls: ['./inline-type-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineTypeSelectComponent {
  @Input() startType = 'misc';
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();
  readonly types = getIngredientTypes();
  readonly typeTrackByFn = trackBySelf;
}
