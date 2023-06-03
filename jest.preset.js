const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  snapshotFormat: { escapeString: false, printBasicPrototype: false },
};
