import { createDefaultSettings } from './create-default-settings';

describe('createDefaultSettings', () => {
  it('returns settings object with correct default values', () => {
    expect(createDefaultSettings()).toEqual({
      randomThematicBoards: false,
      allowBEAndDFBoards: true,
    });
  });
});
