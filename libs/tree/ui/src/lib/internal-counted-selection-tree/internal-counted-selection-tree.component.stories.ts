import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  StoryFn,
  Meta,
  componentWrapperDecorator,
  StoryObj,
} from '@storybook/angular';

import {
  AFRICA,
  ALL_SELECTED_IDS_ARRAY,
  CountableTree,
  SMALL_AFRICA,
  SOME_SELECTED_IDS_ARRAY,
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
      ],
      declarations: [StorybookWrapperComponent],
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

const Template: StoryFn<InternalCountedSelectionTreeComponent<TestItem>> = (
  args: Args
) => ({
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
});

export const noneSelected: StoryObj<
  InternalCountedSelectionTreeComponent<TestItem>
> = {
  render: Template,

  args: createArgs({}),
};

export const someSelected: StoryObj<
  InternalCountedSelectionTreeComponent<TestItem>
> = {
  render: Template,

  args: createArgs({
    tree: new CountableTree(
      AFRICA,
      getId,
      getChildren,
      getTargetCount,
      SOME_SELECTED_IDS_ARRAY
    ),
  }),
};

export const allSelected: StoryObj<
  InternalCountedSelectionTreeComponent<TestItem>
> = {
  render: Template,

  args: createArgs({
    tree: new CountableTree(
      AFRICA,
      getId,
      getChildren,
      getTargetCount,
      ALL_SELECTED_IDS_ARRAY
    ),
  }),
};

export const withCustomStyling: StoryObj<
  InternalCountedSelectionTreeComponent<TestItem>
> = {
  render: Template,

  args: createArgs({
    ids: [],
    className: 'custom-selection-tree',
  }),
};

type Args = Partial<InternalCountedSelectionTreeComponent<TestItem>> & {
  className?: string;
};

function createArgs(
  {
    tree = new CountableTree(AFRICA, getId, getChildren, getTargetCount),
    className = '',
  } = {} as Args
): Args {
  return { tree, className };
}
