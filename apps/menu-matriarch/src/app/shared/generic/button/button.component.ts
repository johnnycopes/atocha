import { Component, Input, ChangeDetectionStrategy, HostBinding, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

type ButtonStyle = 'primary' | 'secondary' | 'ternary' | 'danger';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-button]',
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
  public type: 'submit' | 'button' | 'reset' = 'button';

  @HostBinding('class')
  public get hostClasses(): { [key: string]: boolean } {
    return {
      'app-button': true,
      [`app-button--${this.buttonStyle}`]: true,
    };
  }
}
