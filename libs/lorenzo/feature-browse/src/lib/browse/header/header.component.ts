import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { SearchInputComponent } from '@atocha/core/ui';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [SearchInputComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() text = '';
  @Output() textChange = new EventEmitter<string>();
}
