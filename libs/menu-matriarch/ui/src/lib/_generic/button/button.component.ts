import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

type ButtonStyle = 'primary' | 'secondary' | 'ternary' | 'danger';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ui-button]',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() buttonStyle: ButtonStyle = 'primary';
  @Input() icon: IconDefinition | undefined;

  @Input()
  @HostBinding('attr.type')
  type: 'submit' | 'button' | 'reset' = 'button';

  @HostBinding('class')
  get hostClasses(): { [key: string]: boolean } {
    return {
      'ui-button': true,
      [`ui-button--${this.buttonStyle}`]: true,
    };
  }
}
