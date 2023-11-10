import {
  StoryObj,
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import { Position, RangeSliderComponent } from './range-slider.component';
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

const NUMBER_STEPS = range({ start: 1, stop: 500 });
const numberPosition: Position<number> = {
  start: 153,
  end: 347,
};
export const withNumbers: StoryObj<RangeSliderComponent<number>> = {
  render: (args) => ({
    props: {
      ...args,
      steps: NUMBER_STEPS,
      position: numberPosition,
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

const STRING_STEPS = range({ start: 50, stop: 450 }).map((num) =>
  num.toString()
);
const stringPosition: Position<string> = {
  start: '230',
  end: '400',
};
export const withStrings: StoryObj<RangeSliderComponent<number>> = {
  render: (args) => ({
    props: {
      ...args,
      steps: STRING_STEPS,
      position: stringPosition,
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
  render: (args) => ({
    props: {
      ...args,
      steps: NUMBER_STEPS,
      position: numberPosition,
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
