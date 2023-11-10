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

const STEPS = range({ start: 1, stop: 500 });
const position: Position<number> = {
  start: 153,
  end: 347,
};

export const withNumbers: StoryObj<RangeSliderComponent<number>> = {
  render: (args) => ({
    props: {
      ...args,
      steps: STEPS,
      position,
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
