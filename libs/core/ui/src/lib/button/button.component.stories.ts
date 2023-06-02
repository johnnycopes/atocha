import {
  StoryObj,
  moduleMetadata,
  StoryFn,
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
      options: [
        'primary',
        'secondary',
        'tertiary',
        'danger',
      ] as ButtonVariant[],
    },
    onClick: { action: 'clicked' },
  },
} as Meta<ButtonComponent>;

const Template: StoryFn<ButtonComponent> = (args: Args) => ({
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

export const base = {
  render: Template,
  args: createArgs({}),
};

export const primary = {
  render: Template,

  args: createArgs({
    variant: 'primary',
  }),
};

export const secondary = {
  render: Template,

  args: createArgs({
    variant: 'secondary',
  }),
};

export const tertiary = {
  render: Template,

  args: createArgs({
    variant: 'tertiary',
  }),
};

export const danger = {
  render: Template,

  args: createArgs({
    variant: 'danger',
  }),
};

export const disabled = {
  render: Template,
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
