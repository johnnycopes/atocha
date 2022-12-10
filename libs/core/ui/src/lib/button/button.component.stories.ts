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
    <button core-button="{{ variant }}"
      [disabled]="disabled"
      (click)="onClick($event)"
    >
      {{ slot }}
    </button>
  `,
});

export const base = Template.bind({});
base.args = createArgs({});

export const primary = Template.bind({});
primary.args = createArgs({
  variant: 'primary',
});

export const secondary = Template.bind({});
secondary.args = createArgs({
  variant: 'secondary',
});

export const tertiary = Template.bind({});
tertiary.args = createArgs({
  variant: 'tertiary',
});

export const disabled = Template.bind({});
disabled.args = createArgs({
  disabled: true,
});

type Args = Partial<ButtonComponent> & {
  slot?: string;
  className?: string;
};

function createArgs(
  {
    slot = 'Click me!',
    className = '',
    variant = '',
    disabled = false,
  } = {} as Args
): Args {
  return { slot, className, variant, disabled };
}
