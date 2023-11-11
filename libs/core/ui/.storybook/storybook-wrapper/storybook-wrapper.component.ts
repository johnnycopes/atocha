import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'core-storybook-wrapper',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./storybook-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorybookWrapperComponent {}
