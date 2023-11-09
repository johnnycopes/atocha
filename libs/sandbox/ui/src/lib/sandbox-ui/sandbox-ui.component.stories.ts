import type { Meta, StoryObj } from '@storybook/angular';
import { SandboxUiComponent } from './sandbox-ui.component';

const meta: Meta<SandboxUiComponent> = {
  component: SandboxUiComponent,
  title: 'SandboxUiComponent',
};
export default meta;
type Story = StoryObj<SandboxUiComponent>;

export const Primary: Story = {
  args: {},
};
