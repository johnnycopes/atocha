import { FormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { CheckboxStates, NestedCheckboxesComponent } from './nested-checkboxes.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { ALL_SELECTED, Item, ITEM, NestedItemTreeProvider, SOME_SELECTED } from '../../../.storybook/nested-checkboxes.data';

type NestedCheckboxesArgs = NestedCheckboxesComponent<Item> & { className: string };

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
} as Meta<NestedCheckboxesArgs>;

const Template: Story<NestedCheckboxesArgs> = (args: NestedCheckboxesArgs) => ({
  props: args,
  template: `
    <ui-nested-checkboxes
      [class]="className"
      [item]="item"
      [treeProvider]="treeProvider"
      [ngModel]="states"
      (ngModelChange)="states = $event; onClick($event)"
    ></ui-nested-checkboxes>

    <br />

    <p>states: {{ states | json }}</p>
  `,
});

export const noneSelected = Template.bind( {});
noneSelected.args = createArgs({});

export const someSelected = Template.bind({});
someSelected.args = createArgs({
  states: SOME_SELECTED
});

export const allSelected = Template.bind({});
allSelected.args = createArgs({
  states: ALL_SELECTED
});

export const withCustomStyling = Template.bind({});
withCustomStyling.args = createArgs({
  className: 'custom-nested-checkboxes'
});

function createArgs({
  item = ITEM,
  treeProvider = new NestedItemTreeProvider(ITEM),
  states = {} as CheckboxStates,
  className = '',
} = {}) {
  return { item, treeProvider, states, className };
}
