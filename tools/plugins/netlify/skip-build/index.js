module.exports = {
  onPreBuild: ({ utils }) => {
    const currentProject = 'globetrotter';
    const projectHasChanged = false;
    if (!projectHasChanged) {
      utils.build.cancelBuild(
        `Build was cancelled because ${currentProject} was not affected`;
      );
    }
  },
};
