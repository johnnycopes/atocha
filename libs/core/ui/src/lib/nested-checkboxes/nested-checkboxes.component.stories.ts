import { FormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { CheckboxStates, NestedCheckboxesComponent, TreeProvider } from './nested-checkboxes.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { ITEM, Item, NestedItemTreeProvider } from '../../../.storybook/nested-checkboxes.data';


type NestedCheckboxesArgs = NestedCheckboxesComponent<Item>;

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

const Template: Story<NestedCheckboxesArgs> = (args: NestedCheckboxesArgs) => ({
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

export const Default = Template.bind({});
Default.args = createArgs({
  item: ITEM,
  treeProvider: new NestedItemTreeProvider(ITEM),
});

function createArgs<T>({
  item = {} as Item,
  treeProvider = {} as TreeProvider<T>,
  states = {} as CheckboxStates,
} = {}) {
  return { item, treeProvider, states };
}
