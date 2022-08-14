import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';
import { InputType } from 'zlib';

import {
  CheckboxStates,
  NestedCheckboxesComponent,
} from './nested-checkboxes.component';
import {
  CheckboxComponent,
  CheckboxSize,
} from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import {
  ALL_SELECTED,
  getChildren,
  getId,
  TestItem,
  AFRICA,
  SOME_SELECTED,
} from '../../../.storybook/mock-data/nested-checkboxes';

type NestedCheckboxesArgs = Pick<
  NestedCheckboxesComponent<TestItem>,
  'indentation' | 'states' | 'size'
> & {
  className: string;
  onClick: InputType | undefined;
};

export default {
  title: 'NestedCheckboxesComponent',
  component: NestedCheckboxesComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
      declarations: [
        StorybookWrapperComponent,
        CheckboxComponent,
        TreeComponent,
      ],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['normal', 'large'],
    },
    onClick: { action: 'clicked' },
  },
} as Meta<NestedCheckboxesArgs>;

const Template: Story<NestedCheckboxesArgs> = ({
  indentation,
  states,
  size,
  className,
  onClick,
}: NestedCheckboxesArgs) => ({
  props: {
    item: AFRICA,
    getId,
    getChildren,
    indentation,
    states,
    size,
    className,
    onClick,
  },
  template: `
    <core-nested-checkboxes
      [class]="className"
      [item]="item"
      [getId]="getId"
      [getChildren]="getChildren"
      [indentation]="indentation"
      [size]="size"
      [ngModel]="states"
      (ngModelChange)="states = $event; onClick($event)"
    ></core-nested-checkboxes>
  `,
});

export const noneSelected = Template.bind({});
noneSelected.args = createArgs({
  states: {},
});

export const someSelected = Template.bind({});
someSelected.args = createArgs({
  states: SOME_SELECTED,
});

export const allSelected = Template.bind({});
allSelected.args = createArgs({
  states: ALL_SELECTED,
});

export const withCustomStyling = Template.bind({});
withCustomStyling.args = createArgs({
  states: SOME_SELECTED,
  size: 'large',
  className: 'custom-nested-checkboxes',
});

function createArgs({
  indentation = 24,
  states = {},
  size = 'normal',
  className = '',
}: {
  indentation?: number;
  states?: CheckboxStates;
  size?: CheckboxSize;
  className?: string;
}) {
  return { indentation, states, size, className };
}
