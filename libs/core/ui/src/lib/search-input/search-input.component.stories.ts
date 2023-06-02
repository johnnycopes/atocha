import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  Meta,
  moduleMetadata,
  StoryFn,
  componentWrapperDecorator,
} from '@storybook/angular';

import { AutofocusDirective } from '../autofocus/autofocus.directive';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { SearchInputComponent } from './search-input.component';

export default {
  title: 'Search Input',
  component: SearchInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AutofocusDirective,
        CommonModule,
        FormsModule,
        FontAwesomeModule,
      ],
      declarations: [StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<SearchInputComponent> = (args: Args) => ({
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
});

export const base = {
  render: Template,
  args: createArgs({}),
};

export const autofocus = {
  render: Template,

  args: createArgs({
    autofocus: true,
  }),
};

export const disabled = {
  render: Template,

  args: createArgs({
    disabled: true,
  }),
};

export const withText = {
  render: Template,

  args: createArgs({
    text: 'Search term',
  }),
};

export const withCustomStyling = {
  render: Template,

  args: createArgs({
    text: 'This looks totally different',
    className: 'custom-search-input',
  }),
};

type Args = Partial<SearchInputComponent> & {
  className?: string;
};

function createArgs(
  {
    autofocus = false,
    disabled = false,
    text = '',
    placeholder = 'Type words here...',
    className = '',
  } = {} as Args
): Args {
  return { autofocus, disabled, text, placeholder, className };
}
