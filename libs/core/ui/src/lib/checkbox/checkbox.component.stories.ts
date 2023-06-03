import { FormsModule } from '@angular/forms';
import {
  Meta,
  moduleMetadata,
  StoryFn,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { CheckboxComponent, CheckboxSize } from './checkbox.component';

export default {
  title: 'Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['normal', 'large'],
    },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<CheckboxComponent> = (args: Args) => ({
  props: args,
  template: `
    <core-checkbox
      [class]="className"
      [indeterminate]="indeterminate"
      [disabled]="disabled"
      [size]="size"
      [ngModel]="checked"
      (ngModelChange)="checked = $event; onClick($event)"
    >
      {{ slot }}
    </core-checkbox>
  `,
});

export const base: StoryObj<CheckboxComponent> = {
  render: Template,

  args: createArgs({
    slot: 'Click me!',
  }),
};

export const withCustomStyling: StoryObj<CheckboxComponent> = {
  render: Template,

  args: createArgs({
    slot: 'Click me!',
    size: 'large',
    className: 'custom-checkbox',
  }),
};

type Args = Partial<CheckboxComponent> & {
  slot?: string;
  className?: string;
};

function createArgs(
  {
    slot = '',
    className = '',
    checked = false,
    disabled = false,
    indeterminate = false,
    size = 'normal' as CheckboxSize,
  } = {} as Args
): Args {
  return { slot, className, checked, disabled, indeterminate, size };
}
