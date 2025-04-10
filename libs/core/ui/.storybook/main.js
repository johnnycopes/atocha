const config = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],

  framework: {
    name: '@storybook/angular',
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

export default config;
