import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';

@Component({
  standalone: true,
  selector: 'ui-input',
  imports: [CommonModule, AlertComponent],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() label = '';
  @Input() showError = false;
  @Input() errorMessage = '';
}
