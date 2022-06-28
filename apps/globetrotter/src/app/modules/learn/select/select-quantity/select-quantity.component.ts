import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { SelectService } from '@atocha/data-access-globetrotter';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectQuantityComponent {
  @Input() quantity: number;
  @Input() invalid = false;

  constructor(private _selectService: SelectService) {}

  onChange(quantity: number): void {
    this._selectService.updateQuantity(quantity);
  }
}
