import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { TreeComponent } from './tree.component';

interface Item {
  id: string;
  name: string;
  children?: Item[];
}

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

export const singleItem: Story<TreeComponent<Item>> = () => ({
  props: {
    item: {
      id: '1',
      name: 'Item 1',
    },
    getId,
  },
  template: `
    <ui-tree
      [node]="item"
      [getId]="getId"
    ></ui-tree>
  `
});

export const multipleItems: Story<TreeComponent<Item>> = () => ({
  props: {
    item: {
      id: '2',
      name: 'Item 2',
      children: [
        {
          id: '2A',
          name: 'Item 2A',
        },
      ],
    },
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
