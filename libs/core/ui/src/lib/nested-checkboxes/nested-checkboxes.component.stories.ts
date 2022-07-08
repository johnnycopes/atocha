import { FormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { CheckboxStates, NestedCheckboxesComponent, TreeProvider } from './nested-checkboxes.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';

interface Item {
  id: string;
  parentId?: string;
  children?: Item[];
}

type NestedCheckboxesArgs = NestedCheckboxesComponent<Item>;

const ITEM = {
  id: 'Africa',
  children: [
    {
      id: 'Southern Africa',
      parentId: 'Africa',
      children: [
        {
          id: 'Swaziland',
          parentId: 'Southern Africa',
        },
        {
          id: 'Namibia',
          parentId: 'Southern Africa',
        },
      ],
    },
    {
      id: 'Central Africa',
      parentId: 'Africa',
    },
    {
      id: 'Northern Africa',
      parentId: 'Africa',
      children: [
        {
          id: 'Morocco',
          parentId: 'Northern Africa',
          children: [
            {
              id: 'Marrakesh',
              parentId: 'Morocco',
            },
            {
              id: 'Fes',
              parentId: 'Morocco',
            },
          ],
        },
      ],
    },
  ],
}

class NestedItemTreeProvider implements TreeProvider<Item> {
  private _itemsKeyedById: Record<string, Item> = {};

  constructor(item: Item) {
    // set itemsKeyedById recursively
    const items = [item];
    while (items.length) {
      const currentItem = items.shift();
      if (currentItem) {
        const currentItemId = this.getId(currentItem);
        const currentItemChildren = this.getChildren(currentItem);
        this._itemsKeyedById[currentItemId] = currentItem;
        if (currentItemChildren.length) {
          currentItemChildren.forEach((child) => {
            items.push(child);
          });
        }
      }
    }
  }

  getId(item: Item): string {
    return item.id;
  }

  getParent(item: Item): Item | undefined {
    const parentId = item.parentId;
    if (parentId) {
      return this._itemsKeyedById[parentId];
    }
    return undefined;
  }

  getChildren(item: Item): Item[] {
    return item.children || [];
  }
}


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
    onChange: { action: 'clicked' },
  }
} as Meta<NestedCheckboxesComponent<Item>>;

const Template: Story<NestedCheckboxesArgs> = (args: NestedCheckboxesArgs) => ({
  props: args,
  template: `
    <atocha-nested-checkboxes
      [item]="item"
      [treeProvider]="treeProvider"
      [ngModel]="states"
      (ngModelChange)="onChange($event)"
    ></atocha-nested-checkboxes>
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
