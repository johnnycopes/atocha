import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  Meta,
  moduleMetadata,
  StoryFn,
  componentWrapperDecorator,
} from '@storybook/angular';

import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper.component';
import { KanbanBoardComponent } from './kanban-board.component';

export interface KitchenLocation {
  id: string;
  name: string;
  foods: string[];
}

const getColumnId = ({ id }: KitchenLocation): string => id;
const getColumnName = ({ name }: KitchenLocation): string => name;
const getColumnItems = ({ foods }: KitchenLocation): string[] => foods;
const getItemId = (food: string): string => food;

export default {
  title: 'Kanban Board',
  component: KanbanBoardComponent,
  decorators: [
    moduleMetadata({
      imports: [DragDropModule],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    onColumnAdd: { action: 'columnAdd' },
    onColumnMove: { action: 'columnMove' },
    onItemAdd: { action: 'itemAdd' },
    onItemMove: { action: 'itemMove' },
    actionClick: { action: 'actionClick' },
  },
} as Meta;

const Template: StoryFn<KanbanBoardComponent<KitchenLocation, string>> = (
  args: Args
) => ({
  props: {
    ...args,
    getColumnId,
    getColumnName,
    getColumnItems,
    getItemId,
  },
  template: `
    <app-kanban-board
      [columns]="columns"
      [actions]="actions"
      [getColumnId]="getColumnId"
      [getColumnName]="getColumnName"
      [getColumnItems]="getColumnItems"
      [getItemId]="getItemId"
      (columnAdd)="onColumnAdd($event)"
      (columnMove)="onColumnMove($event)"
      (itemAdd)="onItemAdd($event)"
      (itemMove)="onItemMove($event)"
      (actionClick)="onActionClick($event)"
    ></app-kanban-board>
  `,
});

export const base = {
  render: Template,
  args: createArgs(),
};

type Args = Partial<KanbanBoardComponent<KitchenLocation, string>> & {
  className?: string;
};

function createArgs(
  {
    columns = [
      {
        id: '01',
        name: 'Refrigerator',
        foods: ['Salmon', 'Cheese', 'Oat milk', 'Mustard'],
      },
      {
        id: '02',
        name: 'Freezer',
        foods: ['Chicken', 'Mixed veggies'],
      },
      {
        id: '03',
        name: 'Pantry',
        foods: [
          'Avocados',
          'Tomatoes',
          'Bell peppers',
          'Red onions',
          'Sweet pototoes',
        ],
      },
    ],
    actions = ['Export', 'Print'],
  } = {} as Args
): Args {
  return {
    columns,
    actions,
  };
}
