import {
  StoryObj,
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item.component';
import { ListItemDefDirective } from './list-item-def.directive';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper.component';
import { Item } from './item.interface';

const FAKE_ITEMS: readonly Item[] = [
  {
    name: 'Item 1',
    description: "It's cool",
  },
  {
    name: 'Item 2',
    description: "It's even cooler",
  },
  {
    name: 'Item 3',
    description: "It's the coolest",
  },
];

export default {
  title: 'ListComponent',
  decorators: [
    moduleMetadata({
      imports: [ListComponent, ListItemComponent, ListItemDefDirective],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
} as Meta<ListComponent>;

export const withElements: StoryObj<ListComponent> = {
  render: () => ({
    props: {
      items: FAKE_ITEMS,
    },
    template: `
    <app-list [items]="items">
      <div *appListItemDef="let item">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </app-list>
    `,
  }),
};

export const withCustomComponents: StoryObj<ListComponent> = {
  render: () => ({
    props: {
      items: FAKE_ITEMS,
    },
    template: `
    <app-list [items]="items">
      <app-list-item
        *appListItemDef="let item"
        [name]="item.name"
        [description]="item.description"
      ></app-list-item>
    </app-list>
    `,
  }),
};
