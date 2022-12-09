import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { ButtonComponent, ButtonVariant } from './button.component';

export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'] as ButtonVariant[],
    },
    onClick: { action: 'clicked' },
  },
} as Meta<ButtonComponent>;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
  template: `
    <button core-button
      [variant]="variant"
      [disabled]="disabled"
      (click)="onClick($event)"
    >
      {{ slot }}
    </button>
  `,
});

export const base = Template.bind({});
base.args = createArgs({
  slot: 'Click me!',
});

type Args = Partial<ButtonComponent> & {
  slot?: string;
  className?: string;
};

function createArgs(
  {
    slot = '',
    className = '',
    variant = 'primary',
    disabled = false,
  } = {} as Args
): Args {
  return { slot, className, variant, disabled };
}
