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
  CountedSelectionTree,
  SMALL_AFRICA,
  SOME_SELECTED_IDS,
  TestItem,
  getChildren,
  getId,
  getTargetCount,
} from '@atocha/tree/util';
import { CheckboxComponent } from '@atocha/core/ui';
import { InternalCountedSelectionTreeComponent } from './internal-counted-selection-tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';

export default {
  title: 'Internal Counted Selection Tree',
  component: InternalCountedSelectionTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CheckboxComponent,
        FormsModule,
        InternalCountedSelectionTreeComponent,
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
    onNodeClick: { action: 'nodeClick' },
    onChanged: { action: 'changed' },
    onSelectedChange: { action: 'selectedChange' },
    onTotalChange: { action: 'totalChange' },
  },
} as Meta<InternalCountedSelectionTreeComponent<TestItem>>;

export const noneSelected: StoryObj<
  InternalCountedSelectionTreeComponent<TestItem>
> = {
  render: (args) => ({
    props: {
      ...args,
      getId,
      getChildren,
    },
    template: `
      <core-internal-counted-selection-tree
        [class]="className"
        [tree]="tree"
        [template]="checkboxTemplate"
        [ids]="ids"
        (nodeClick)="onNodeClick($event)"
        (changed)="ids = $event; onChanged($event)"
        (selectedChange)="onSelectedChange($event)"
        (totalChange)="onTotalChange($event)"
      ></core-internal-counted-selection-tree>

      <ng-template #checkboxTemplate
        let-node
        let-level="level"
        let-checked="checked"
        let-indeterminate="indeterminate"
        let-onChange="onChange"
        let-selected="selected"
        let-total="total"
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
          ({{
            this.getChildren(node).length
              ? selected + ' / ' + total
              : total
          }})
        </core-checkbox>
      </ng-template>
    `,
  }),
  args: createArgs({}),
};

export const someSelected: StoryObj<
  InternalCountedSelectionTreeComponent<TestItem>
> = {
  ...noneSelected,
  args: createArgs({
    tree: new CountedSelectionTree(
      AFRICA,
      getId,
      getChildren,
      getTargetCount,
      SOME_SELECTED_IDS
    ),
  }),
};

export const allSelected: StoryObj<
  InternalCountedSelectionTreeComponent<TestItem>
> = {
  ...noneSelected,
  args: createArgs({
    tree: new CountedSelectionTree(
      AFRICA,
      getId,
      getChildren,
      getTargetCount,
      ALL_SELECTED_IDS
    ),
  }),
};

export const withCustomStyling: StoryObj<
  InternalCountedSelectionTreeComponent<TestItem>
> = {
  ...noneSelected,
  args: createArgs({
    className: 'custom-selection-tree',
  }),
};

function createArgs({
  tree = new CountedSelectionTree(AFRICA, getId, getChildren, getTargetCount),
  className = '',
} = {}) {
  return { tree, className };
}
