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
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import {
  ALL_SELECTED,
  getChildren,
  getCounts,
  getId,
  NestedItem,
  NESTED_ITEM,
  SOME_SELECTED,
} from '../../../.storybook/mock-data/nested-checkboxes';
import { NestedCheckboxesWithCountsComponent } from './nested-checkboxes-with-counts.component';

type NestedCheckboxesWithCountsArgs = Pick<
  NestedCheckboxesComponent<NestedItem>,
  'states'
> & {
  className: string;
  onClick: InputType | undefined;
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
    onClick: { action: 'clicked' },
  },
} as Meta<NestedCheckboxesWithCountsArgs>;

const Template: Story<NestedCheckboxesWithCountsArgs> = ({
  states,
  className,
  onClick,
}: NestedCheckboxesWithCountsArgs) => ({
  props: {
    item: NESTED_ITEM,
    getId,
    getChildren,
    getCounts,
    states,
    className,
    onClick,
  },
  template: `
    <core-nested-checkboxes-with-counts
      [class]="className"
      [item]="item"
      [getId]="getId"
      [getChildren]="getChildren"
      [getLeafItemCount]="getCounts"
      [ngModel]="states"
      (ngModelChange)="states = $event; onClick($event)"
    ></core-nested-checkboxes-with-counts>
  `,
});

export const noneSelected = Template.bind({});
noneSelected.args = {
  states: {},
};

export const someSelected = Template.bind({});
someSelected.args = createArgs({
  states: SOME_SELECTED,
});

export const allSelected = Template.bind({});
allSelected.args = createArgs({
  states: ALL_SELECTED,
});

// export const nestedItemWithCustomStyling = Template.bind({});
// nestedItemWithCustomStyling.args = createArgs({
//   states: SOME_SELECTED,
//   className: 'custom-nested-checkboxes',
// });

function createArgs({
  states = {},
  className = '',
}: {
  states?: CheckboxStates;
  className?: string;
}) {
  return { states, className };
}
