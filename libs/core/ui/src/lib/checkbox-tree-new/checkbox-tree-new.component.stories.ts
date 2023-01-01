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
  getChildren,
  getId,
  AFRICA,
  TestItem,
  SOME_SELECTED_NEW,
  ALL_SELECTED_NEW,
  SMALL_AFRICA,
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
    item: {
      control: { type: 'select' },
      options: ['Africa', 'Small Africa'],
      mapping: {
        Africa: AFRICA,
        'Small Africa': SMALL_AFRICA,
      },
    },
    onClick: { action: 'clicked' },
  },
} as Meta<CheckboxTreeNewComponent<TestItem>>;

const Template: Story<CheckboxTreeNewComponent<TestItem>> = (args: Args) => ({
  props: {
    ...args,
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
      [ngModel]="model"
      (ngModelChange)="model = $event; onClick($event)"
    ></core-checkbox-tree-new>
  `,
});

export const noneSelected = Template.bind({});
noneSelected.args = createArgs({
  model: [],
});

export const someSelected = Template.bind({});
someSelected.args = createArgs({
  model: SOME_SELECTED_NEW,
});

export const allSelected = Template.bind({});
allSelected.args = createArgs({
  model: ALL_SELECTED_NEW,
});

export const withCustomStyling = Template.bind({});
withCustomStyling.args = createArgs({
  model: [],
  size: 'large',
  className: 'custom-checkbox-tree',
});

type Args = Partial<CheckboxTreeNewComponent<TestItem>> & {
  className?: string;
};

function createArgs(
  {
    item = AFRICA,
    indentation = 24,
    model = [],
    size = 'normal',
    className = '',
  } = {} as Args
): Args {
  return { item, indentation, model, size, className };
}
