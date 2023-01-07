import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import {
  getChildren,
  getId,
  AFRICA,
  TestItem,
  SOME_SELECTED_NEW,
  ALL_SELECTED_NEW,
  SMALL_AFRICA,
} from './mock-data';
import { CheckboxTreeComponent } from './checkbox-tree.component';

export default {
  title: 'Checkbox Tree',
  component: CheckboxTreeComponent,
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
} as Meta<CheckboxTreeComponent<TestItem>>;

const Template: Story<CheckboxTreeComponent<TestItem>> = (args: Args) => ({
  props: {
    ...args,
    getId,
    getChildren,
  },
  template: `
    <core-checkbox-tree
      [class]="className"
      [tree]="tree"
      [getId]="getId"
      [getChildren]="getChildren"
      [template]="checkboxTemplate"
      [ngModel]="model"
      (ngModelChange)="model = $event; onClick($event)"
    ></core-checkbox-tree>

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
        (ngModelChange)="onChange($event, node)"
      >
        {{ this.getId(node) }}
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
  model: [],
  className: 'custom-checkbox-tree',
});

type Args = Partial<CheckboxTreeComponent<TestItem>> & {
  className?: string;
};

function createArgs(
  { tree = AFRICA, model = [], className = '' } = {} as Args
): Args {
  return { tree, model, className };
}
