import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Development } from '@atocha/lorenzo/util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ui-development]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './development.component.html',
  styleUrls: ['../cards.scss', './development.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentComponent {
  @Input() data: Development | undefined;
}
