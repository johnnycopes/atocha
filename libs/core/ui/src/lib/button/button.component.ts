import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[core-button]',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-button',
  },
})
export class ButtonComponent {
  @HostBinding('disabled')
  @Input()
  disabled = false;

  @Input()
  set variant(value: ButtonVariant) {
    this.variantClass = this._createVariantClass(value);
  }

  @HostBinding('class')
  variantClass = this._createVariantClass('primary');

  @HostBinding('attr.data-test')
  dataTest = 'core-button';

  private _createVariantClass(variant: ButtonVariant): string {
    return `core-button--${variant}`;
  }
}
