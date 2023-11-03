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
  ALL_SELECTED_ARRAY_MODEL,
  SMALL_AFRICA,
  SOME_SELECTED_ARRAY_MODEL,
  TestItem,
  getChildren,
  getId,
} from '@atocha/tree/util';
import { CheckboxComponent } from '@atocha/core/ui';
import { SelectionTreeComponent } from './selection-tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { TreeComponent } from '../tree/tree.component';

export default {
  title: 'Selection Tree',
  component: SelectionTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule, CheckboxComponent, TreeComponent],
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
    onClick: { action: 'clicked' },
  },
} as Meta<SelectionTreeComponent<TestItem>>;

const Template: StoryFn<SelectionTreeComponent<TestItem>> = (args: Args) => ({
  props: {
    ...args,
    getId,
    getChildren,
  },
  template: `
    <core-selection-tree
      [class]="className"
      [tree]="tree"
      [getId]="getId"
      [getChildren]="getChildren"
      [template]="checkboxTemplate"
      [ngModel]="model"
      (ngModelChange)="model = $event; onClick($event)"
    ></core-selection-tree>

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

export const noneSelected: StoryObj<SelectionTreeComponent<TestItem>> = {
  render: Template,

  args: createArgs({
    model: [],
  }),
};

export const someSelected: StoryObj<SelectionTreeComponent<TestItem>> = {
  render: Template,

  args: createArgs({
    model: SOME_SELECTED_ARRAY_MODEL,
  }),
};

export const allSelected: StoryObj<SelectionTreeComponent<TestItem>> = {
  render: Template,

  args: createArgs({
    model: ALL_SELECTED_ARRAY_MODEL,
  }),
};

export const withCustomStyling: StoryObj<SelectionTreeComponent<TestItem>> = {
  render: Template,

  args: createArgs({
    model: [],
    className: 'custom-selection-tree',
  }),
};

type Args = Partial<SelectionTreeComponent<TestItem>> & {
  className?: string;
};

function createArgs(
  { tree = AFRICA, model = [], className = '' } = {} as Args
): Args {
  return { tree, model, className };
}
