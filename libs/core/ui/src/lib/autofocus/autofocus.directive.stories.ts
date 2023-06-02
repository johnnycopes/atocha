import {
  StoryObj,
  moduleMetadata,
  StoryFn,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { AutofocusDirective } from './autofocus.directive';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';

export default {
  title: 'Autofocus',
  decorators: [
    moduleMetadata({
      imports: [AutofocusDirective],
      declarations: [StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
} as Meta<AutofocusDirective>;

export const base: StoryObj<Args> = {
  render: (args: Args) => ({
    props: args,
    template: `
      <input coreAutofocus />
    `,
  }),
};

export const input: StoryObj<Args> = {
  render: (args: Args) => ({
    props: args,
    template: `
      <input [coreAutofocus]="focus" />
    `,
  }),

  args: createArgs(),
};

export const textarea: StoryObj<Args> = {
  render: (args: Args) => ({
    props: args,
    template: `
      <textarea [coreAutofocus]="focus"></textarea>
    `,
  }),

  args: createArgs(),
};

export const turnedOff: StoryObj<Args> = {
  render: (args: Args) => ({
    props: args,
    template: `
      <input [coreAutofocus]="false" />
    `,
  }),
};

type Args = Partial<AutofocusDirective> & { focus: boolean };

function createArgs({ focus = true } = {} as Args): Args {
  return { focus };
}
