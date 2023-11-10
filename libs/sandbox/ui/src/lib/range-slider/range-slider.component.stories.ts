import {
  StoryObj,
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { RangeSliderComponent } from './range-slider.component';
import { StorybookWrapperComponent } from '../../../.storybook/storybook-wrapper.component';
import { range } from '@atocha/core/util';

export default {
  title: 'RangeSliderComponent',
  decorators: [
    moduleMetadata({
      imports: [RangeSliderComponent, StorybookWrapperComponent],
    }),
    componentWrapperDecorator(StorybookWrapperComponent),
  ],
  argTypes: {
    onChange: { action: 'modelChange' },
  },
} as Meta<RangeSliderComponent<number>>;

export const withNumbers: StoryObj<RangeSliderComponent<number>> = {
  args: {
    position: {
      start: 23,
      end: 47,
    },
    steps: range({ start: 1, stop: 50 }),
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <app-range-slider
        [steps]="steps"
        [position]="position"
        (positionChange)="position = $event; onChange($event)"
      ></app-range-slider>
    `,
  }),
};

export const withStrings: StoryObj<RangeSliderComponent<string>> = {
  args: {
    position: {
      start: '23',
      end: '40',
    },
    steps: range({ start: 50, stop: 450 }).map((num) => num.toString()),
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <app-range-slider
        [steps]="steps"
        [position]="position"
        (positionChange)="position = $event; onChange($event)"
      ></app-range-slider>
    `,
  }),
};

export const withCustomTemplate: StoryObj<RangeSliderComponent<number>> = {
  args: {
    position: {
      start: 3,
      end: 26,
    },
    steps: range({ start: 1, stop: 40 }),
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <app-range-slider
        [steps]="steps"
        [template]="customTemplate"
        [position]="position"
        (positionChange)="position = $event; onChange($event)"
      ></app-range-slider>

      <ng-template #customTemplate let-position>
        🔥 {{ position }} 🔥
      </ng-template>
    `,
  }),
};
