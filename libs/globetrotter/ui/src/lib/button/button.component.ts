import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ButtonComponent as CoreButtonComponent } from '@atocha/core/ui';

@Component({
  standalone: true,
  selector: 'ui-button',
  imports: [CoreButtonComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() buttonText = '';
  @Input() buttonType = 'button';
  @Input() buttonStyle: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
