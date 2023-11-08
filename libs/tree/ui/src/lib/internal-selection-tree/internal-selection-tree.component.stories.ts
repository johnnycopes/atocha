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
  SMALL_AFRICA,
  SOME_SELECTED_IDS_ARRAY,
  TestItem,
  Tree,
  getChildren,
  getId,
} from '@atocha/tree/util';
import { CheckboxComponent } from '@atocha/core/ui';
import { InternalSelectionTreeComponent } from './internal-selection-tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { TreeComponent } from '../tree/tree.component';

export default {
  title: 'Internal Selection Tree',
  component: InternalSelectionTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent, FormsModule, TreeComponent],
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
    changed: { action: 'changed' },
    nodeClick: { action: 'nodeClick' },
    selectedChange: { action: 'selectedChange' },
    totalChange: { action: 'totalChange' },
  },
} as Meta<InternalSelectionTreeComponent<TestItem>>;

const Template: StoryFn<InternalSelectionTreeComponent<TestItem>> = (
  args: Args
) => ({
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
});

export const noneSelected: StoryObj<InternalSelectionTreeComponent<TestItem>> =
  {
    render: Template,

    args: createArgs({}),
  };

export const someSelected: StoryObj<InternalSelectionTreeComponent<TestItem>> =
  {
    render: Template,

    args: createArgs({
      tree: new Tree(AFRICA, getId, getChildren, SOME_SELECTED_IDS_ARRAY),
    }),
  };

export const allSelected: StoryObj<InternalSelectionTreeComponent<TestItem>> = {
  render: Template,

  args: createArgs({
    tree: new Tree(AFRICA, getId, getChildren, ALL_SELECTED_IDS_ARRAY),
  }),
};

export const withCustomStyling: StoryObj<
  InternalSelectionTreeComponent<TestItem>
> = {
  render: Template,

  args: createArgs({
    ids: [],
    className: 'custom-selection-tree',
  }),
};

type Args = Partial<InternalSelectionTreeComponent<TestItem>> & {
  className?: string;
};

function createArgs(
  { tree = new Tree(AFRICA, getId, getChildren), className = '' } = {} as Args
): Args {
  return { tree, className };
}
