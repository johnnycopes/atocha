const { dirname } = require('path');

const config = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },
};

module.exports = config;

function getAbsolutePath(value) {
  return dirname(require.resolve(`${value}/package.json`));
}
