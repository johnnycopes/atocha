import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { CheckboxTreeComponent } from '../checkbox-tree/checkbox-tree.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import {
  ALL_SELECTED_NEW,
  getChildren,
  getCounts,
  getId,
  TestItem,
  AFRICA,
  SOME_SELECTED_NEW,
  SMALL_AFRICA,
} from '../../../.storybook/mock-data/checkbox-tree';
import { CountedCheckboxTreeNewComponent } from './counted-checkbox-tree-new.component';

export default {
  title: 'Counted Checkbox Tree New',
  component: CountedCheckboxTreeNewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        CheckboxComponent,
        CheckboxTreeComponent,
        TreeComponent,
      ],
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
    onNgModelChange: { action: 'ngModelChange' },
    onSelectedChange: { action: 'selectedChange' },
    onTotalChange: { action: 'totalChange' },
  },
} as Meta<CountedCheckboxTreeNewComponent<TestItem>>;

const Template: Story<CountedCheckboxTreeNewComponent<TestItem>> = (
  args: Args
) => ({
  props: {
    ...args,
    getId,
    getChildren,
    getCounts,
  },
  template: `
    <core-counted-checkbox-tree-new
      [class]="className"
      [item]="item"
      [getId]="getId"
      [getChildren]="getChildren"
      [getLeafItemCount]="getCounts"
      [indentation]="indentation"
      [size]="size"
      [ngModel]="model"
      (ngModelChange)="model = $event; onNgModelChange($event)"
      (selectedChange)="onSelectedChange($event)"
      (totalChange)="onTotalChange($event)"
    ></core-counted-checkbox-tree-new>
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
  model: SOME_SELECTED_NEW,
  size: 'large',
  className: 'custom-counted-checkbox-tree',
});

type Args = Partial<CountedCheckboxTreeNewComponent<TestItem>> & {
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
