import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import {
  ALL_SELECTED,
  getChildren,
  getId,
  AFRICA,
  SOME_SELECTED,
  TestItem,
} from '../../../.storybook/mock-data/checkbox-tree';
import { CheckboxTreeNewComponent } from './checkbox-tree-new.component';

export default {
  title: 'Checkbox Tree New',
  component: CheckboxTreeNewComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, CheckboxComponent, TreeComponent],
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
} as Meta<CheckboxTreeNewComponent<TestItem>>;

const Template: Story<CheckboxTreeNewComponent<TestItem>> = (args: Args) => ({
  props: {
    ...args,
    item: AFRICA,
    getId,
    getChildren,
  },
  template: `
    <core-checkbox-tree-new
      [class]="className"
      [item]="item"
      [getId]="getId"
      [getChildren]="getChildren"
      [indentation]="indentation"
      [size]="size"
      [ngModel]="states"
      (ngModelChange)="states = $event; onClick($event)"
    ></core-checkbox-tree-new>
  `,
});

export const noneSelected = Template.bind({});
noneSelected.args = createArgs({
  states: {},
});

export const someSelected = Template.bind({});
someSelected.args = createArgs({
  states: SOME_SELECTED,
});

export const allSelected = Template.bind({});
allSelected.args = createArgs({
  states: ALL_SELECTED,
});

export const withCustomStyling = Template.bind({});
withCustomStyling.args = createArgs({
  states: SOME_SELECTED,
  size: 'large',
  className: 'custom-checkbox-tree',
});

type Args = Partial<CheckboxTreeNewComponent<TestItem>> & {
  className?: string;
};

function createArgs(
  {
    indentation = 24,
    states = {},
    size = 'normal',
    className = '',
  } = {} as Args
): Args {
  return { indentation, states, size, className };
}
