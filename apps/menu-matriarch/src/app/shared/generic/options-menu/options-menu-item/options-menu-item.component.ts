import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[app-options-menu-item]',
	templateUrl: './options-menu-item.component.html',
	styleUrls: ['./options-menu-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsMenuItemComponent {
  @Input()
  @HostBinding('attr.disabled')
  @HostBinding('class.disabled')
  disabled = false;
}
