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
  ALL_SELECTED,
  getChildren,
  getCounts,
  getId,
  TestItem,
  AFRICA,
  SOME_SELECTED,
} from '../../../.storybook/mock-data/nested-checkboxes';
import { CountedCheckboxTreeComponent } from './counted-checkbox-tree.component';

export default {
  title: 'Counted Checkbox Tree',
  component: CountedCheckboxTreeComponent,
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
    onNgModelChange: { action: 'ngModelChange' },
    onSelectedChange: { action: 'selectedChange' },
    onTotalChange: { action: 'totalChange' },
  },
} as Meta<CountedCheckboxTreeComponent<TestItem>>;

const Template: Story<CountedCheckboxTreeComponent<TestItem>> = (
  args: Args
) => ({
  props: {
    ...args,
    item: AFRICA,
    getId,
    getChildren,
    getCounts,
  },
  template: `
    <core-counted-checkbox-tree
      [class]="className"
      [item]="item"
      [getId]="getId"
      [getChildren]="getChildren"
      [getLeafItemCount]="getCounts"
      [indentation]="indentation"
      [size]="size"
      [ngModel]="states"
      (ngModelChange)="states = $event; onNgModelChange($event)"
      (selectedChange)="onSelectedChange($event)"
      (totalChange)="onTotalChange($event)"
    ></core-counted-checkbox-tree>
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
  className: 'custom-counted-checkbox-tree',
});

type Args = Partial<CountedCheckboxTreeComponent<TestItem>> & {
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
