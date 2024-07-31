import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';

import { AutofocusDirective } from '../autofocus/autofocus.directive';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { SearchInputComponent } from './search-input.component';

export default {
  title: 'Search Input',
  decorators: [
    moduleMetadata({
      imports: [
        AutofocusDirective,
        CommonModule,
        FaIconComponent,
        FormsModule,
        SearchInputComponent,
        StorybookWrapperComponent,
      ],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<SearchInputComponent>;

export const base: StoryObj<SearchInputComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <core-search-input
        [class]="className"
        [autofocus]="autofocus"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [text]="text"
        (textChange)="text = $event; onClick($event)"
      ></core-search-input>
    `,
  }),
  args: createArgs({}),
};

export const autofocus: StoryObj<SearchInputComponent> = {
  ...base,
  args: createArgs({
    autofocus: true,
  }),
};

export const disabled: StoryObj<SearchInputComponent> = {
  ...base,
  args: createArgs({
    disabled: true,
  }),
};

export const withText: StoryObj<SearchInputComponent> = {
  ...base,
  args: createArgs({
    text: 'Search term',
  }),
};

export const withCustomStyling: StoryObj<SearchInputComponent> = {
  ...base,
  args: createArgs({
    text: 'This looks totally different',
    className: 'custom-search-input',
  }),
};

function createArgs({
  autofocus = false,
  disabled = false,
  text = '',
  placeholder = 'Type words here...',
  className = '',
} = {}) {
  return { autofocus, disabled, text, placeholder, className };
}
