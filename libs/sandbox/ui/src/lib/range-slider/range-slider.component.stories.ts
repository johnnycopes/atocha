import {
  StoryObj,
  moduleMetadata,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular';

import {
  IRangeSliderModel,
  RangeSliderComponent,
} from './range-slider.component';
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
const model: IRangeSliderModel<number> = {
  start: 153,
  end: 347,
};

export const withNumbers: StoryObj<RangeSliderComponent<number>> = {
  render: (args) => ({
    props: {
      ...args,
      steps: STEPS,
      model,
    },
    template: `
      <app-range-slider
        [steps]="steps"
        [model]="model"
        (modelChange)="model = $event; onChange($event)"
      ></app-range-slider>
    `,
  }),
};
