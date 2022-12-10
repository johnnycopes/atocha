import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent } from '@atocha/core/ui';

@Component({
  standalone: true,
  selector: 'ui-filters-button',
  imports: [ButtonComponent, FontAwesomeModule],
  templateUrl: './filters-button.component.html',
  styleUrls: ['./filters-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersButtonComponent {
  @Input() count = 0;
  @Input() open = false;
  @Output() clicked = new EventEmitter<void>();
  readonly openIcon = faCaretDown;
  readonly closedIcon = faCaretUp;
}
