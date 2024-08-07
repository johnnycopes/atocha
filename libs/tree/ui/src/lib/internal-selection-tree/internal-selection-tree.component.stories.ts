import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import {
  AFRICA,
  ALL_SELECTED_IDS,
  SMALL_AFRICA,
  SOME_SELECTED_IDS,
  SelectionTree,
  TestItem,
  getChildren,
  getId,
} from '@atocha/tree/util';
import { CheckboxComponent } from '@atocha/core/ui';
import { InternalSelectionTreeComponent } from './internal-selection-tree.component';
import { TreeComponent } from '../tree/tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';

export default {
  title: 'Internal Selection Tree',
  component: InternalSelectionTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CheckboxComponent,
        FormsModule,
        TreeComponent,
        StorybookWrapperComponent,
      ],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['normal', 'large'],
    },
    root: {
      control: { type: 'select' },
      options: ['Africa', 'Small Africa'],
      mapping: {
        Africa: AFRICA,
        'Small Africa': SMALL_AFRICA,
      },
    },
    changed: { action: 'changed' },
    nodeClick: { action: 'nodeClick' },
    selectedChange: { action: 'selectedChange' },
    totalChange: { action: 'totalChange' },
  },
} as Meta<InternalSelectionTreeComponent<TestItem>>;

export const noneSelected: StoryObj<InternalSelectionTreeComponent<TestItem>> =
  {
    render: (args) => ({
      props: {
        ...args,
        getId,
        getChildren,
      },
      template: `
        <core-internal-selection-tree
          [class]="className"
          [tree]="tree"
          [template]="checkboxTemplate"
          [ids]="ids"
          (changed)="ids = $event; changed($event)"
          (nodeClick)="nodeClick($event)"
          (selectedChange)="selectedChange($event)"
          (totalChange)="totalChange($event)"
        ></core-internal-selection-tree>

        <ng-template #checkboxTemplate
          let-node
          let-level="level"
          let-checked="checked"
          let-indeterminate="indeterminate"
          let-onChange="onChange"
        >
          <core-checkbox
            [style.margin-left.px]="level * 24"
            [style.margin-bottom.px]="4"
            [indeterminate]="indeterminate"
            size="normal"
            [ngModel]="checked"
            (ngModelChange)="onChange(node)"
          >
            {{ this.getId(node) }}
          </core-checkbox>
        </ng-template>
      `,
    }),
    args: createArgs({}),
  };

export const someSelected: StoryObj<InternalSelectionTreeComponent<TestItem>> =
  {
    ...noneSelected,
    args: createArgs({
      tree: new SelectionTree(AFRICA, getId, getChildren, SOME_SELECTED_IDS),
    }),
  };

export const allSelected: StoryObj<InternalSelectionTreeComponent<TestItem>> = {
  ...noneSelected,
  args: createArgs({
    tree: new SelectionTree(AFRICA, getId, getChildren, ALL_SELECTED_IDS),
  }),
};

export const withCustomStyling: StoryObj<
  InternalSelectionTreeComponent<TestItem>
> = {
  ...noneSelected,
  args: createArgs({
    className: 'custom-selection-tree',
  }),
};

function createArgs({
  tree = new SelectionTree(AFRICA, getId, getChildren),
  className = '',
} = {}) {
  return { tree, className };
}
