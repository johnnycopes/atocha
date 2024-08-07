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
  Ids,
  SMALL_AFRICA,
  SOME_SELECTED_IDS,
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
      imports: [
        FormsModule,
        CheckboxComponent,
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
    ngModelChange: { action: 'ngModelChange' },
    nodeClick: { action: 'nodeClick' },
  },
} as Meta<SelectionTreeComponent<TestItem>>;

export const noneSelected: StoryObj<SelectionTreeComponent<TestItem>> = {
  render: (args) => ({
    props: {
      ...args,
      getId,
      getChildren,
    },
    template: `
      <core-selection-tree
        [class]="className"
        [root]="root"
        [getId]="getId"
        [getChildren]="getChildren"
        [template]="checkboxTemplate"
        [ngModel]="ids"
        (ngModelChange)="ids = $event; ngModelChange($event)"
        (nodeClick)="nodeClick($event)"
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
  }),
  args: createArgs({
    ids: [],
  }),
};

export const someSelected: StoryObj<SelectionTreeComponent<TestItem>> = {
  ...noneSelected,
  args: createArgs({
    ids: SOME_SELECTED_IDS,
  }),
};

export const allSelected: StoryObj<SelectionTreeComponent<TestItem>> = {
  ...noneSelected,
  args: createArgs({
    ids: ALL_SELECTED_IDS,
  }),
};

export const withCustomStyling: StoryObj<SelectionTreeComponent<TestItem>> = {
  ...noneSelected,
  args: createArgs({
    className: 'custom-selection-tree',
  }),
};

function createArgs({ root = AFRICA, ids = [] as Ids, className = '' } = {}) {
  return { root, ids, className };
}
