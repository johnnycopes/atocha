import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  StoryFn,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import {
  AFRICA,
  ALL_SELECTED_MODEL,
  getChildren,
  getCounts,
  getId,
  SMALL_AFRICA,
  SOME_SELECTED_MODEL,
  TestItem,
} from '../selection-tree/mock-data';
import { CountedSelectionTreeComponent } from './counted-selection-tree.component';

export default {
  title: 'Counted Selection Tree',
  component: CountedSelectionTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, CheckboxComponent],
      declarations: [StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['normal', 'large'],
    },
    tree: {
      control: { type: 'select' },
      options: ['Africa', 'Small Africa'],
      mapping: {
        Africa: AFRICA,
        'Small Africa': SMALL_AFRICA,
      },
    },
    onNgModelChange: { action: 'ngModelChange' },
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
    getCounts,
  },
  template: `
    <core-counted-selection-tree
      [class]="className"
      [tree]="tree"
      [getId]="getId"
      [getChildren]="getChildren"
      [getLeafNodeCount]="getCounts"
      [template]="checkboxTemplate"
      [ngModel]="model"
      (ngModelChange)="model = $event; onNgModelChange($event)"
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
        (ngModelChange)="onChange($event, node)"
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

export const noneSelected = {
  render: Template,

  args: createArgs({
    model: [],
  }),
};

export const someSelected = {
  render: Template,

  args: createArgs({
    model: SOME_SELECTED_MODEL,
  }),
};

export const allSelected = {
  render: Template,

  args: createArgs({
    model: ALL_SELECTED_MODEL,
  }),
};

export const withCustomStyling = {
  render: Template,

  args: createArgs({
    model: SOME_SELECTED_MODEL,
    className: 'custom-counted-selection-tree',
  }),
};

type Args = Partial<CountedSelectionTreeComponent<TestItem>> & {
  className?: string;
};

function createArgs(
  { tree = AFRICA, model = [], className = '' } = {} as Args
): Args {
  return { tree, model, className };
}
