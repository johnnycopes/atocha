import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { SelectService } from '@atocha/globetrotter-data-access';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectQuantityComponent {
  @Input() quantity = 0;
  @Input() invalid = false;

  constructor(private _selectService: SelectService) {}

  onChange(quantity: number): void {
    this._selectService.updateQuantity(quantity);
  }
}
