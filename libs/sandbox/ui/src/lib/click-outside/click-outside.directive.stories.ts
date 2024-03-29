import { StoryObj, moduleMetadata, Meta } from '@storybook/angular';

import { ClickOutsideDirective } from './click-outside.directive';

export default {
  title: 'Click Outside',
  decorators: [
    moduleMetadata({
      imports: [ClickOutsideDirective],
    }),
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
        (appClickOutside)="outside($event)"
      >
        Click inside or outside of me to see different actions fire
      </p>
    `,
  }),
};

type Args = Partial<ClickOutsideDirective>;
