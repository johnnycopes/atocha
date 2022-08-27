import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderType } from '@atocha/lorenzo/util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ui-leader]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderComponent {
  @Input() name = '';
  @Input() requirement = '';
  @Input() ability = '';
  @Input() type: LeaderType = 'permanent';
}
