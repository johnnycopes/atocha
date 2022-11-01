import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  Meta,
  moduleMetadata,
  Story,
  componentWrapperDecorator,
} from '@storybook/angular';

import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper/storybook-wrapper.component';
import { KanbanBoard, KanbanBoardComponent } from './kanban-board.component';

export interface IKitchenLocation {
  id: string;
  name: string;
  items: string[];
}

class KanbanBoardConfig implements KanbanBoard<IKitchenLocation, string> {
  getColumnId = (node: IKitchenLocation): string => node.id;
  getColumnName = (node: IKitchenLocation): string => node.name;
  getColumnItems = (node: IKitchenLocation): string[] => node.items;
  getItemId = (node: string): string => node;
}

export default {
  title: 'Kanban Board',
  component: KanbanBoardComponent,
  decorators: [
    moduleMetadata({
      imports: [DragDropModule],
      declarations: [StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    onColumnAdd: { action: 'columnAdd' },
    onColumnMove: { action: 'columnMov' },
    onItemAdd: { action: 'itemAdd' },
    onItemMove: { action: 'itemMov' },
    actionClick: { action: 'actionClick' },
  },
} as Meta;

const Template: Story<KanbanBoardComponent<IKitchenLocation, string>> = (
  args: Args
) => ({
  props: args,
  template: `
    <core-kanban-board
      [columns]="columns"
      [config]="config"
      [actions]="actions"
      (columnAdd)="onColumnAdd($event)"
      (columnMove)="onColumnMove($event)"
      (itemAdd)="onItemAdd($event)"
      (itemMove)="onItemMove($event)"
      (actionClick)="onActionClick($event)"
    ></core-kanban-board>
  `,
});

export const base = Template.bind({});
base.args = createArgs();

type Args = Partial<KanbanBoardComponent<IKitchenLocation, string>> & {
  className?: string;
};

function createArgs(
  {
    columns = [
      {
        id: '01',
        name: 'Refrigerator',
        items: ['Salmon', 'Cheese', 'Oat milk', 'Mustard'],
      },
      {
        id: '02',
        name: 'Freezer',
        items: ['Chicken', 'Mixed veggies'],
      },
      {
        id: '03',
        name: 'Pantry',
        items: [
          'Avocados',
          'Tomatoes',
          'Bell peppers',
          'Red onions',
          'Sweet pototoes',
        ],
      },
    ],
    config = new KanbanBoardConfig(),
    actions = ['Export', 'Print'],
  } = {} as Args
): Args {
  return { columns, config, actions };
}
