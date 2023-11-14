import { BOARDS, Board, BalancedBoardName } from '../game/boards';
import type { MapName } from '../game/maps';
import type { Players } from '../game/players';
import { getOptionsByName } from './get-options';
import { selectRandom } from './internal/select-random';

export function selectBoards(
  mapName: MapName,
  players: Players,
  boardNames: BalancedBoardName[]
): Board[] {
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

function getBoardsByName(boardNames: BalancedBoardName[]): Board[] {
  return getOptionsByName(BOARDS, boardNames);
}
