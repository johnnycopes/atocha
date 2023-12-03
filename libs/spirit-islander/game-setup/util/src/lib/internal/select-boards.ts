import {
  BalancedBoardName,
  Board,
  MapName,
  Players,
  getBoards,
} from '@atocha/spirit-islander/shared/util';
import { selectRandom } from './select-random';
import { Settings } from '@atocha/spirit-islander/settings/util';

export function selectBoards(
  mapName: MapName,
  players: Players,
  boardNames: readonly BalancedBoardName[],
  { randomizedThematicBoards }: Settings = {
    randomizedThematicBoards: false,
  }
): readonly Board[] {
  if (mapName === 'Balanced' || randomizedThematicBoards) {
    return getBoards({ names: selectRandom(boardNames, players) });
  }
  switch (players) {
    case 1: {
      return getBoards({ names: ['A'] });
    }
    case 2: {
      return getBoards({ names: ['D', 'B'] });
    }
    case 3: {
      return getBoards({ names: ['D', 'B', 'A'] });
    }
    case 4: {
      return getBoards({ names: ['D', 'B', 'A', 'C'] });
    }
    case 5: {
      return getBoards({ names: ['D', 'B', 'A', 'C', 'F'] });
    }
    case 6: {
      return getBoards({ names: ['D', 'B', 'A', 'C', 'F', 'E'] });
    }
  }
}
