import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-filters-button',
  templateUrl: './filters-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersButtonComponent {
  @Input() count = 0;
  @Input() open = false;
  @Output() clicked = new EventEmitter<void>();
  readonly openIcon = faCaretDown;
  readonly closedIcon = faCaretUp;
}
