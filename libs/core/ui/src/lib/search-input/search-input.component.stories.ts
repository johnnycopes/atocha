import { FormsModule } from '@angular/forms';
import {
  Meta,
  moduleMetadata,
  Story,
  componentWrapperDecorator,
} from '@storybook/angular';

import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { SearchInputComponent } from './search-input.component';

type SearchInputArgs = SearchInputComponent & { slot: string };

export default {
  title: 'Search Input',
  component: SearchInputComponent,
  decorators: [
    moduleMetadata({
      // imports: [FormsModule],
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

const Template: Story<SearchInputArgs> = (args: SearchInputArgs) => ({
  props: args,
  template: `
    <core-search-input>
    </core-search-input>
  `,
});

export const base = Template.bind({});
// base.args = createArgs({
//   slot: 'Click me!',
// });

// export const withCustomStyling = Template.bind({});
// withCustomStyling.args = createArgs({
//   slot: 'Click me!',
//   size: 'large',
//   className: 'custom-checkbox',
// });

// function createArgs({
//   slot = '',
//   className = '',
//   checked = false,
//   disabled = false,
//   indeterminate = false,
//   size = 'normal' as CheckboxSize,
// } = {}) {
//   return { slot, className, checked, disabled, indeterminate, size };
// }
