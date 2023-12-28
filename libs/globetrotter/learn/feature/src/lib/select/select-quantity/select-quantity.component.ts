import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '@atocha/globetrotter/shared/ui';
import { SelectForm } from '../select-form';

@Component({
  standalone: true,
  selector: 'app-select-quantity',
  imports: [FormsModule, InputComponent, ReactiveFormsModule],
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectQuantityComponent {
  @Input({ required: true }) form!: SelectForm;
  @Input() invalid = false;
  @Input() quantity = 0;
  @Output() quantityChange = new EventEmitter<number>();
}
