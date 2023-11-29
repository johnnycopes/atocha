import {
  BalancedBoardName,
  Board,
  MapName,
  Players,
  getBoards,
} from '@atocha/spirit-islander/shared/util';
import { selectRandom } from './select-random';

export function selectBoards(
  mapName: MapName,
  players: Players,
  boardNames: readonly BalancedBoardName[]
): readonly Board[] {
  if (mapName === 'Balanced') {
    const randomBoardNames = selectRandom(boardNames, players);
    return getBoards({ names: randomBoardNames });
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
