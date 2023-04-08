import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputComponent } from '@atocha/globetrotter/ui';

@Component({
  standalone: true,
  selector: 'app-select-quantity',
  imports: [FormsModule, InputComponent],
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectQuantityComponent {
  @Input() invalid = false;
  @Input() quantity = 0;
  @Output() quantityChange = new EventEmitter<number>();
}
