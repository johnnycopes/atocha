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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form[ui-inline-form]',
  imports: [CommonModule, FormsModule, FontAwesomeModule, ButtonComponent],
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InlineFormComponent {
  @Input() disabled = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  readonly cancelIcon = faTimes;
  readonly saveIcon = faCheck;

  @HostBinding('class')
  hostClass = 'ui-inline-form';
}
