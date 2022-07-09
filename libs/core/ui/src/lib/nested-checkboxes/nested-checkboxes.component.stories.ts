import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import {
  CheckboxStates,
  NestedCheckboxesComponent,
} from './nested-checkboxes.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { ALL_SELECTED, SOME_SELECTED } from '../../../.storybook/mock-data/nested-checkboxes.data';
import { NESTED_ITEM } from '../../../.storybook/mock-data/nested-item';
import { Item } from '../../../.storybook/mock-data/item.interface';
import { NestedItemTreeProvider } from '../../../.storybook/mock-data/nested-item-tree-provider';

type NestedCheckboxesArgs = NestedCheckboxesComponent<Item> & {
  className: string;
};

export default {
  title: 'NestedCheckboxesComponent',
  component: NestedCheckboxesComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [
        StorybookWrapperComponent,
        CheckboxComponent,
        TreeComponent,
      ],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<NestedCheckboxesArgs>;

const Template: Story<NestedCheckboxesArgs> = (args: NestedCheckboxesArgs) => ({
  props: args,
  template: `
    <core-nested-checkboxes
      [class]="className"
      [item]="item"
      [treeProvider]="treeProvider"
      [ngModel]="states"
      (ngModelChange)="states = $event; onClick($event)"
    ></core-nested-checkboxes>

    <br />

    <p>states: {{ states | json }}</p>
  `,
});

export const noneSelected = Template.bind({});
noneSelected.args = createArgs({});

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
  className: 'custom-nested-checkboxes',
});

function createArgs({
  item = NESTED_ITEM,
  treeProvider = new NestedItemTreeProvider(NESTED_ITEM),
  states = {} as CheckboxStates,
  className = '',
} = {}) {
  return { item, treeProvider, states, className };
}
