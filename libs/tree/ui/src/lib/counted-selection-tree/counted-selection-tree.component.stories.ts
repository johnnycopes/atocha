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
  ALL_SELECTED_IDS,
  SMALL_AFRICA,
  SOME_SELECTED_IDS,
  TestItem,
  getChildren,
  getId,
  getTargetCount,
} from '@atocha/tree/util';
import { CheckboxComponent } from '@atocha/core/ui';
import { CountedSelectionTreeComponent } from './counted-selection-tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';

export default {
  title: 'Counted Selection Tree',
  component: CountedSelectionTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent, FormsModule, StorybookWrapperComponent],
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
    onNgModelChange: { action: 'ngModelChange' },
    onNodeClick: { action: 'nodeClick' },
    onSelectedChange: { action: 'selectedChange' },
    onTotalChange: { action: 'totalChange' },
  },
} as Meta<CountedSelectionTreeComponent<TestItem>>;

const Template: StoryFn<CountedSelectionTreeComponent<TestItem>> = (
  args: Args
) => ({
  props: {
    ...args,
    getId,
    getChildren,
    getTargetCount,
  },
  template: `
    <core-counted-selection-tree
      [class]="className"
      [root]="root"
      [getId]="getId"
      [getChildren]="getChildren"
      [getLeafCount]="getTargetCount"
      [template]="checkboxTemplate"
      [ngModel]="ids"
      (ngModelChange)="ids = $event; onNgModelChange($event)"
      (nodeClick)="onNodeClick($event)"
      (selectedChange)="onSelectedChange($event)"
      (totalChange)="onTotalChange($event)"
    ></core-counted-selection-tree>

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

export const noneSelected: StoryObj<CountedSelectionTreeComponent<TestItem>> = {
  render: Template,

  args: createArgs({
    ids: [],
  }),
};

export const someSelected: StoryObj<CountedSelectionTreeComponent<TestItem>> = {
  render: Template,

  args: createArgs({
    ids: SOME_SELECTED_IDS,
  }),
};

export const allSelected: StoryObj<CountedSelectionTreeComponent<TestItem>> = {
  render: Template,

  args: createArgs({
    ids: ALL_SELECTED_IDS,
  }),
};

export const withCustomStyling: StoryObj<
  CountedSelectionTreeComponent<TestItem>
> = {
  render: Template,

  args: createArgs({
    ids: SOME_SELECTED_IDS,
    className: 'custom-counted-selection-tree',
  }),
};

type Args = Partial<CountedSelectionTreeComponent<TestItem>> & {
  className?: string;
};

function createArgs(
  { root = AFRICA, ids = [], className = '' } = {} as Args
): Args {
  return { root, ids, className };
}
