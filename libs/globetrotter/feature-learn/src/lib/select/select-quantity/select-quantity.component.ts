import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectQuantityComponent {
  @Input() invalid = false;
  @Input() quantity = 0;
  @Output() quantityChange = new EventEmitter<number>();
}
