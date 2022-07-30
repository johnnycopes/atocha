import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';

import { optionsMenuAnimation } from './options-menu-animation';

@Component({
	selector: 'app-options-menu',
	templateUrl: './options-menu.component.html',
	styleUrls: ['./options-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [optionsMenuAnimation]
})
export class OptionsMenuComponent {
  @Output() closed = new EventEmitter<void>();

  @ViewChild(TemplateRef)
  public templateRef: TemplateRef<unknown> | undefined;
}
