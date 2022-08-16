import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ui-options-menu-item]',
  templateUrl: './options-menu-item.component.html',
  styleUrls: ['./options-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsMenuItemComponent {
  @Input()
  @HostBinding('attr.disabled')
  @HostBinding('class.disabled')
  disabled = false;
}
