import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { SearchInputComponent } from '@atocha/core/ui';
import { View } from '../view.type';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  imports: [SearchInputComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() view: View = 'all';
  @Input() text = '';
  @Output() viewChange = new EventEmitter<View>();
  @Output() textChange = new EventEmitter<string>();
}
