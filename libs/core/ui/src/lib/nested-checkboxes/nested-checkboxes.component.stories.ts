import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NestedCheckboxesComponent } from './nested-checkboxes.component';

export default {
  title: 'NestedCheckboxesComponent',
  component: NestedCheckboxesComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<NestedCheckboxesComponent>;

const Template: Story<NestedCheckboxesComponent> = (args: NestedCheckboxesComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}