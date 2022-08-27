import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  Meta,
  moduleMetadata,
  Story,
  componentWrapperDecorator,
} from '@storybook/angular';

import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { SearchInputComponent } from './search-input.component';

type SearchInputArgs = SearchInputComponent;

export default {
  title: 'Search Input',
  component: SearchInputComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, FontAwesomeModule],
      declarations: [StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<SearchInputArgs> = (args: SearchInputArgs) => ({
  props: args,
  template: `
    <core-search-input
      [class]="className"
      [placeholder]="placeholder"
      [text]="text"
      (textChange)="text = $event; onClick($event)"
    ></core-search-input>
  `,
});

export const base = Template.bind({});
base.args = createArgs({
  text: 'Something',
});

export const withCustomStyling = Template.bind({});
withCustomStyling.args = createArgs({
  text: 'This looks totally different',
  className: 'custom-search-input',
});

function createArgs({
  className = '',
  text = '',
  placeholder = 'Type words here...',
} = {}) {
  return { className, text, placeholder };
}
