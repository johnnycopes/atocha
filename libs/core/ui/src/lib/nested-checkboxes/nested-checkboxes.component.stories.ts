import { FormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { CheckboxStates, NestedCheckboxesComponent, TreeProvider } from './nested-checkboxes.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { ALL_SELECTED, ITEM, Item, NestedItemTreeProvider, SOME_SELECTED } from '../../../.storybook/nested-checkboxes.data';

export default {
  title: 'NestedCheckboxesComponent',
  component: NestedCheckboxesComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [CheckboxComponent, TreeComponent]
    })
  ],
  argTypes: {
    onClick: { action: 'clicked' },
  }
} as Meta<NestedCheckboxesComponent<Item>>;

const Template: Story<NestedCheckboxesComponent<Item>> = (args: NestedCheckboxesComponent<Item>) => ({
  props: args,
  template: `
    <atocha-nested-checkboxes
      [item]="item"
      [treeProvider]="treeProvider"
      [ngModel]="states"
      (ngModelChange)="states = $event; onClick($event)"
    ></atocha-nested-checkboxes>

    <br />

    <p>states: {{ states | json }}</p>
  `,
});

export const noneSelected = Template.bind({});
noneSelected.args = createArgs({
  item: ITEM,
  treeProvider: new NestedItemTreeProvider(ITEM),
});

export const someSelected = Template.bind({});
someSelected.args = createArgs({
  item: ITEM,
  treeProvider: new NestedItemTreeProvider(ITEM),
  states: SOME_SELECTED
});

export const allSelected = Template.bind({});
allSelected.args = createArgs({
  item: ITEM,
  treeProvider: new NestedItemTreeProvider(ITEM),
  states: ALL_SELECTED
});


function createArgs<T>({
  item = {} as Item,
  treeProvider = {} as TreeProvider<T>,
  states = {} as CheckboxStates,
} = {}) {
  return { item, treeProvider, states };
}
