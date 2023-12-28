import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '@atocha/globetrotter/shared/ui';
import { SelectForm } from '../select-form';

@Component({
  standalone: true,
  selector: 'app-select-quantity',
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectQuantityComponent {
  @Input({ required: true }) form!: SelectForm;
  @Input({ required: true }) error = '';
}
