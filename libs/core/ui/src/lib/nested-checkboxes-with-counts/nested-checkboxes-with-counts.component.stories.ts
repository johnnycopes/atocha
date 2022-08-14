import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { InputType } from 'zlib';

import {
  CheckboxStates,
  NestedCheckboxesComponent,
} from '../nested-checkboxes/nested-checkboxes.component';
import {
  CheckboxComponent,
  CheckboxSize,
} from '../checkbox/checkbox.component';
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
import { NestedCheckboxesWithCountsComponent } from './nested-checkboxes-with-counts.component';

type NestedCheckboxesWithCountsArgs = Pick<
  NestedCheckboxesComponent<TestItem>,
  'indentation' | 'states' | 'size'
> & {
  className: string;
  onNgModelChange: InputType | undefined;
  onSelectedChange: InputType | undefined;
  onTotalChange: InputType | undefined;
};

export default {
  title: 'NestedCheckboxesWithCountsComponent',
  component: NestedCheckboxesWithCountsComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [
        StorybookWrapperComponent,
        CheckboxComponent,
        NestedCheckboxesComponent,
        TreeComponent,
      ],
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
} as Meta<NestedCheckboxesWithCountsArgs>;

const Template: Story<NestedCheckboxesWithCountsArgs> = ({
  indentation,
  states,
  size,
  className,
  onNgModelChange,
  onSelectedChange,
  onTotalChange,
}: NestedCheckboxesWithCountsArgs) => ({
  props: {
    item: AFRICA,
    getId,
    getChildren,
    getCounts,
    indentation,
    states,
    size,
    className,
    onNgModelChange,
    onSelectedChange,
    onTotalChange,
  },
  template: `
    <core-nested-checkboxes-with-counts
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
    ></core-nested-checkboxes-with-counts>
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
  className: 'custom-nested-checkboxes-with-counts',
});

function createArgs({
  indentation = 24,
  states = {},
  size = 'normal',
  className = '',
}: {
  indentation?: number;
  states?: CheckboxStates;
  size?: CheckboxSize;
  className?: string;
}) {
  return { indentation, states, size, className };
}
