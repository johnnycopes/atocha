import { Settings } from './settings.interface';

export function createDefaultSettings(): Settings {
  return {
    randomThematicBoards: false,
    allowBEAndDFBoards: true,
  };
}
