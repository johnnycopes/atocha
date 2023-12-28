import { createDefaultSettings } from './create-default-settings';

describe('createDefaultSettings', () => {
  it('returns settings object with correct default values', () => {
    expect(createDefaultSettings()).toStrictEqual({
      randomThematicBoards: false,
      allowBEAndDFBoards: true,
    });
  });
});
