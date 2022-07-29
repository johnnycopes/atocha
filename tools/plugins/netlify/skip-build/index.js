module.exports = {
  onPrebuild: () => {
    console.log('---------------- hello world: prebuild');
  },
  onBuild: () => {
    console.log('---------------- hello world: build');
  },
};
