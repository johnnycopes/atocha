import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { fadeInAnimation } from '../animations';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  selector: 'ui-error',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class ErrorComponent {
  @Input() header = '';
  @Input() message = '';
  @Input() action = '';
  @Output() actionClick = new EventEmitter<void>();
}
