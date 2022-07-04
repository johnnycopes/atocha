import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { TreeComponent } from './tree.component';

interface Item {
  id: string;
  name: string;
  children?: Item[];
}

const singleItem: Item = {
  id: '1',
  name: 'Item 1',
};
const itemWithDescendants: Item =  {
  id: '2',
  name: 'Item 2',
  children: [
    {
      id: '2A',
      name: 'Item 2A',
    },
    {
      id: '2B',
      name: 'Item 2B',
      children: [
        {
          id: '2B.1',
          name: 'Item 2B1'
        }
      ]
    },
  ],
};
const getId = ({ id }: Item) => id;
const getChildren = ({ children }: Item) => children ?? [];

export default {
  title: 'TreeComponent',
  component: TreeComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<TreeComponent<Item>>;

export const leaf: Story<TreeComponent<Item>> = () => ({
  props: {
    item: singleItem,
    getId,
  },
  template: `
    <ui-tree
      [node]="item"
      [getId]="getId"
    ></ui-tree>
  `
});

export const withChildren: Story<TreeComponent<Item>> = () => ({
  props: {
    item: itemWithDescendants,
    getId,
    getChildren,
  },
  template: `
    <ui-tree
      [node]="item"
      [getId]="getId"
      [getChildren]="getChildren"
    ></ui-tree>
  `
});

export const withCustomTemplate: Story<TreeComponent<Item>> = () => ({
  props: {
    item: itemWithDescendants,
    getId,
    getChildren,
  },
  template: `
    <ui-tree
      [node]="item"
      [template]="itemTemplate"
      [getId]="getId"
      [getChildren]="getChildren"
    ></ui-tree>

    <ng-template #itemTemplate
      let-item
      let-level="level"
      let-isTop="level === 0"
    >
      <span
        [style.fontWeight]="isTop ? '700' : '400'"
        [style.margin-left.px]="level * 16"
      >
        {{ item.name }}{{ isTop ? ' | 👑' : '' }}
      </span>
    </ng-template>
  `
});
