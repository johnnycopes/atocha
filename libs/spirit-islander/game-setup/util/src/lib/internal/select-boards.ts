import {
  BOARDS,
  BalancedBoardName,
  Board,
  MapName,
  Players,
  getOptionsByName,
} from '@atocha/spirit-islander/shared/util';
import { selectRandom } from './select-random';

export function selectBoards(
  mapName: MapName,
  players: Players,
  boardNames: readonly BalancedBoardName[]
): readonly Board[] {
  if (mapName === 'Balanced') {
    const randomBoardNames = selectRandom(boardNames, players);
    return getBoardsByName(randomBoardNames);
  }
  switch (players) {
    case 1: {
      return getBoardsByName(['A']);
    }
    case 2: {
      return getBoardsByName(['D', 'B']);
    }
    case 3: {
      return getBoardsByName(['D', 'B', 'A']);
    }
    case 4: {
      return getBoardsByName(['D', 'B', 'A', 'C']);
    }
    case 5: {
      return getBoardsByName(['D', 'B', 'A', 'C', 'F']);
    }
    case 6: {
      return getBoardsByName(['D', 'B', 'A', 'C', 'F', 'E']);
    }
  }
}

function getBoardsByName(boardNames: BalancedBoardName[]): readonly Board[] {
  return getOptionsByName(BOARDS, boardNames);
}
