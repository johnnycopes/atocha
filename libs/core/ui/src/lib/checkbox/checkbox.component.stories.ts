import { FormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { CheckboxComponent } from './checkbox.component';

type CheckboxArgs = CheckboxComponent & { slot: string };

export default {
  title: 'Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
} as Meta;

const Template: Story<CheckboxArgs> = (args: CheckboxArgs) => ({
  props: args,
  template: `
    <atocha-checkbox
      [indeterminate]="indeterminate"
      [disabled]="disabled"
      [ngModel]="checked"
    >
      {{ slot }}
    </atocha-checkbox>
  `,
});

export const Default = Template.bind({});
Default.args = createArgs({
  slot: 'Click me!',
});

function createArgs({
  slot = '',
  checked = false,
  disabled = false,
  indeterminate = false,
} = {}) {
  return { slot, checked, disabled, indeterminate };
}
