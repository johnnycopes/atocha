import {
  StoryObj,
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { ButtonComponent, ButtonVariant } from './button.component';

export default {
  title: 'ButtonComponent',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'tertiary',
        'danger',
      ] as ButtonVariant[],
    },
    onClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
} as Meta<ButtonComponent>;

export const base: StoryObj<ButtonComponent> = {
  render: (args: Args) => ({
    props: args,
    template: `
      <button core-button="{{ variant }}"
        [disabled]="disabled"
        (click)="onClick($event)"
      >
        {{ slot }}
      </button>
    `,
  }),
  args: createArgs({}),
};

export const primary: StoryObj<ButtonComponent> = {
  ...base,
  args: createArgs({
    variant: 'primary',
  }),
};

export const secondary: StoryObj<ButtonComponent> = {
  ...base,

  args: createArgs({
    variant: 'secondary',
  }),
};

export const tertiary: StoryObj<ButtonComponent> = {
  ...base,

  args: createArgs({
    variant: 'tertiary',
  }),
};

export const danger: StoryObj<ButtonComponent> = {
  ...base,
  args: createArgs({
    variant: 'danger',
  }),
};

export const disabled: StoryObj<ButtonComponent> = {
  ...base,
  args: createArgs({}),
};

export const asLink: StoryObj<ButtonComponent> = {
  render: (args: Args) => ({
    props: args,
    template: `
      <a core-button="{{ variant }}"
        href="#"
      >
        {{ slot }}
      </a>
    `,
  }),

  args: createArgs({}),
};

type Args = Partial<ButtonComponent> & {
  slot?: string;
  className?: string;
};

function createArgs(
  { slot = 'Click me!', className = '', variant = '' } = {} as Args
): Args {
  return { slot, className, variant };
}
