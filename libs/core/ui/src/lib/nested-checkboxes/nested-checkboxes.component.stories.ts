import { FormsModule } from '@angular/forms';
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import {
  CheckboxStates,
  NestedCheckboxesComponent,
} from './nested-checkboxes.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TreeComponent } from '../tree/tree.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { NestedItem, NESTED_ITEM } from '../../../.storybook/mock-data/nested-item';
import {
  ALL_SELECTED,
  SOME_SELECTED,
} from '../../../.storybook/mock-data/checkbox-states';

type NestedCheckboxesArgs = Pick<NestedCheckboxesComponent<NestedItem>, 'states'> & {
  className: string;
};

const getId = ({ id }: NestedItem) => id;
const getChildren = ({ children }: NestedItem) => children ?? [];

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

const Template: Story<NestedCheckboxesArgs> = ({ states, className }: NestedCheckboxesArgs) => ({
  props: {
    item: NESTED_ITEM,
    getId,
    getChildren,
    states,
    className,
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

export const nestedItemWithNoneSelected = Template.bind({});
nestedItemWithNoneSelected.args = {
  states: {},
};

export const nestedItemWithSomeSelected = Template.bind({});
nestedItemWithSomeSelected.args = createArgs({
  states: SOME_SELECTED,
});

export const nestedItemWithAllSelected = Template.bind({});
nestedItemWithAllSelected.args = createArgs({
  states: ALL_SELECTED,
});

export const nestedItemWithCustomStyling = Template.bind({});
nestedItemWithCustomStyling.args = createArgs({
  states: SOME_SELECTED,
  className: 'custom-nested-checkboxes',
});

function createArgs({ states = {}, className = '' }: {
  states?: CheckboxStates;
  className?: string;
}) {
  return { states, className };
}
