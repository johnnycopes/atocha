import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[core-button]',
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'core-button',
    }
})
export class ButtonComponent {
  @Input('core-button')
  set variant(value: '' | ButtonVariant) {
    this.variantClass = `core-button--${value ? value : 'primary'}`;
  }

  @HostBinding('class')
  variantClass = '';

  @HostBinding('attr.data-test')
  dataTest = 'core-button';
}
