import { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],

  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
