import {
  moduleMetadata,
  Story,
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

export const base: Story<Args> = (args: Args) => ({
  props: args,
  template: `
    <input coreAutofocus />
  `,
});

export const input: Story<Args> = (args: Args) => ({
  props: args,
  template: `
    <input [coreAutofocus]="focus" />
  `,
});
input.args = createArgs();

export const textarea: Story<Args> = (args: Args) => ({
  props: args,
  template: `
    <textarea [coreAutofocus]="focus"></textarea>
  `,
});
textarea.args = createArgs();

export const turnedOff: Story<Args> = (args: Args) => ({
  props: args,
  template: `
    <input [coreAutofocus]="false" />
  `,
});

type Args = Partial<AutofocusDirective> & { focus: boolean };

function createArgs({ focus = true } = {} as Args): Args {
  return { focus };
}
