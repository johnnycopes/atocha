import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ViewEncapsulation,
  HostBinding,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent } from '@atocha/core/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form[ui-inline-form]',
  imports: [ButtonComponent, CommonModule, FaIconComponent, FormsModule],
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InlineFormComponent {
  @Input() disabled = false;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  readonly cancelIcon = faTimes;
  readonly saveIcon = faCheck;

  @HostBinding('class')
  hostClass = 'ui-inline-form';
}
