import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'core-storybook-wrapper',
  templateUrl: './storybook-wrapper.component.html',
  styleUrls: ['./storybook-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorybookWrapperComponent {}
