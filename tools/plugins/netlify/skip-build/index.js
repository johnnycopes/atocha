module.exports = {
  onPreBuild: ({ utils }) => {
    console.log('---------------- hello world: prebuild');
  },
  onBuild: () => {
    console.log('---------------- hello world: build');
  },
};
