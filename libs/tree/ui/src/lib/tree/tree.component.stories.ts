import { StoryFn, moduleMetadata, Meta } from '@storybook/angular';

import { AFRICA, TestItem, getChildren, getId } from '@atocha/tree/util';
import { TreeComponent } from './tree.component';

export default {
  title: 'Tree',
  component: TreeComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<TreeComponent<TestItem>>;

export const leaf: StoryFn<TreeComponent<TestItem>> = () => ({
  props: {
    root: AFRICA,
    getId,
  },
  template: `
    <core-tree
      [root]="root"
      [getId]="getId"
    ></core-tree>
  `,
});

export const withChildren: StoryFn<TreeComponent<TestItem>> = () => ({
  props: {
    root: AFRICA,
    getId,
    getChildren,
  },
  template: `
    <core-tree
      [root]="root"
      [getId]="getId"
      [getChildren]="getChildren"
    ></core-tree>
  `,
});

export const withCustomTemplate: StoryFn<TreeComponent<TestItem>> = () => ({
  props: {
    root: AFRICA,
    getId,
    getChildren,
  },
  template: `
    <core-tree
      [root]="root"
      [template]="nodeTemplate"
      [getId]="getId"
      [getChildren]="getChildren"
    ></core-tree>

    <ng-template #nodeTemplate
      let-node
      let-level="level"
      let-isTop="level === 0"
    >
      <span
        [style.fontWeight]="isTop ? '700' : '400'"
        [style.margin-left.px]="level * 16"
      >
        {{ getId(node) }} {{ isTop ? ' | 👑' : '' }}
      </span>
    </ng-template>
  `,
});
