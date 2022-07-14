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
import { CheckboxComponent } from '../checkbox/checkbox.component';
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
  'states'
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
    onClick: { action: 'clicked' },
  },
} as Meta<NestedCheckboxesArgs>;

const Template: Story<NestedCheckboxesArgs> = ({
  states,
  className,
  onClick,
}: NestedCheckboxesArgs) => ({
  props: {
    item: AFRICA,
    getId,
    getChildren,
    states,
    className,
    onClick,
  },
  template: `
    <core-nested-checkboxes
      [class]="className"
      [item]="item"
      [getId]="getId"
      [getChildren]="getChildren"
      [ngModel]="states"
      (ngModelChange)="states = $event; onClick($event)"
    ></core-nested-checkboxes>
  `,
});

export const noneSelected = Template.bind({});
noneSelected.args = {
  states: {},
};

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
  className: 'custom-nested-checkboxes',
});

function createArgs({
  states = {},
  className = '',
}: {
  states?: CheckboxStates;
  className?: string;
}) {
  return { states, className };
}
