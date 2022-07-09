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
  TreeProvider,
} from './nested-checkboxes.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { Item } from '../../../.storybook/mock-data/item.interface';
import { ALL_SELECTED, SOME_SELECTED } from '../../../.storybook/mock-data/checkbox-states';
import { NESTED_ITEM } from '../../../.storybook/mock-data/nested-item';
import { FLAT_ITEMS } from '../../../.storybook/mock-data/flat-items';
import { NestedItemTreeProvider } from '../../../.storybook/mock-data/nested-item-tree-provider';
import { FlatItemsTreeProvider } from '../../../.storybook/mock-data/flat-items-tree-provider';

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

export const nestedItemWithNoneSelected = Template.bind({});
nestedItemWithNoneSelected.args = createNestedItemArgs({});

export const nestedItemWithSomeSelected = Template.bind({});
nestedItemWithSomeSelected.args = createNestedItemArgs({
  states: SOME_SELECTED,
});

export const nestedItemWithAllSelected = Template.bind({});
nestedItemWithAllSelected.args = createNestedItemArgs({
  states: ALL_SELECTED,
});

export const nestedItemWithCustomStyling = Template.bind({});
nestedItemWithCustomStyling.args = createNestedItemArgs({
  states: SOME_SELECTED,
  className: 'custom-nested-checkboxes',
});

export const flatItemWithNoneSelected = Template.bind({});
flatItemWithNoneSelected.args = createFlatArgs({});

export const flatItemWithSomeSelected = Template.bind({});
flatItemWithSomeSelected.args = createFlatArgs({
  states: SOME_SELECTED,
});

export const flatItemWithAllSelected = Template.bind({});
flatItemWithAllSelected.args = createFlatArgs({
  states: ALL_SELECTED,
});

export const flatItemWithCustomStyling = Template.bind({});
flatItemWithCustomStyling.args = createFlatArgs({
  states: SOME_SELECTED,
  className: 'custom-nested-checkboxes',
});

function createNestedItemArgs({ states = {} as CheckboxStates, className = ''}) {
  return createArgs({
    item: NESTED_ITEM,
    treeProvider: new NestedItemTreeProvider(NESTED_ITEM),
    states,
    className,
  });
}

function createFlatArgs({ states = {} as CheckboxStates, className = ''}) {
  return createArgs({
    item: FLAT_ITEMS[0],
    treeProvider: new FlatItemsTreeProvider(FLAT_ITEMS),
    states,
    className,
  });
}

function createArgs<T>({
  item,
  treeProvider,
  states = {},
  className = '',
}: { item: T, treeProvider: TreeProvider<T>, states: CheckboxStates, className: string }) {
  return { item, treeProvider, states, className };
}
