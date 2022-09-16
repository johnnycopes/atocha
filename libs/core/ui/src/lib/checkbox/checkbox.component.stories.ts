import { FormsModule } from '@angular/forms';
import {
  Meta,
  moduleMetadata,
  Story,
  componentWrapperDecorator,
} from '@storybook/angular';
import { InputType } from 'zlib';

import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { CheckboxComponent, CheckboxSize } from './checkbox.component';

type CheckboxArgs = CheckboxComponent & { slot: string };

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

const Template: Story<CheckboxArgs> = (args: CheckboxArgs) => ({
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

export const base = Template.bind({});
base.args = createArgs({
  slot: 'Click me!',
});

export const withCustomStyling = Template.bind({});
withCustomStyling.args = createArgs({
  slot: 'Click me!',
  size: 'large',
  className: 'custom-checkbox',
});

type Args = Partial<CheckboxComponent> & {
  slot?: string;
  className?: string;
};

function createArgs({
  slot = '',
  className = '',
  checked = false,
  disabled = false,
  indeterminate = false,
  size = 'normal' as CheckboxSize,
} = {} as Args): Args {
  return { slot, className, checked, disabled, indeterminate, size };
}
