import {
  StoryObj,
  moduleMetadata,
  StoryFn,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { ClickOutsideDirective } from './click-outside.directive';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';

export default {
  title: 'Click Outside',
  decorators: [
    moduleMetadata({
      imports: [ClickOutsideDirective],
      declarations: [StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    inside: { action: 'INSIDE' },
    outside: { action: 'OUTSIDE' },
  },
} as Meta<ClickOutsideDirective>;

export const base: StoryObj<Args> = {
  render: (args: Args) => ({
    props: args,
    template: `
      <p style="background: goldenrod; padding: 16px;"
        (click)="inside($event)"
        (coreClickOutside)="outside($event)"
      >
        Click inside or outside of me to see different actions fire
      </p>
    `,
  }),
};

type Args = Partial<ClickOutsideDirective>;
