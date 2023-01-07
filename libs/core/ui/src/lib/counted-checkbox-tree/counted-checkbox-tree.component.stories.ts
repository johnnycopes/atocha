import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import {
  ALL_SELECTED_NEW,
  getChildren,
  getCounts,
  getId,
  TestItem,
  AFRICA,
  SOME_SELECTED_NEW,
  SMALL_AFRICA,
} from '../checkbox-tree/mock-data';
import { CountedCheckboxTreeComponent } from './counted-checkbox-tree.component';

export default {
  title: 'Counted Checkbox Tree',
  component: CountedCheckboxTreeComponent,
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
} as Meta<CountedCheckboxTreeComponent<TestItem>>;

const Template: Story<CountedCheckboxTreeComponent<TestItem>> = (
  args: Args
) => ({
  props: {
    ...args,
    getId,
    getChildren,
    getCounts,
  },
  template: `
    <core-counted-checkbox-tree
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
    ></core-counted-checkbox-tree>

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

export const noneSelected = Template.bind({});
noneSelected.args = createArgs({
  model: [],
});

export const someSelected = Template.bind({});
someSelected.args = createArgs({
  model: SOME_SELECTED_NEW,
});

export const allSelected = Template.bind({});
allSelected.args = createArgs({
  model: ALL_SELECTED_NEW,
});

export const withCustomStyling = Template.bind({});
withCustomStyling.args = createArgs({
  model: SOME_SELECTED_NEW,
  className: 'custom-counted-checkbox-tree',
});

type Args = Partial<CountedCheckboxTreeComponent<TestItem>> & {
  className?: string;
};

function createArgs(
  { tree = AFRICA, model = [], className = '' } = {} as Args
): Args {
  return { tree, model, className };
}
