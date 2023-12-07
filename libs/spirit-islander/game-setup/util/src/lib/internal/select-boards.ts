import {
  Settings,
  createDefaultSettings,
} from '@atocha/spirit-islander/settings/util';
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
  boardNames: readonly BalancedBoardName[],
  {
    randomThematicBoards,
    allowBEAndDFBoards,
  }: Settings = createDefaultSettings()
): readonly Board[] {
  if (mapName === 'Thematic' && !randomThematicBoards) {
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
  } else {
    let names = boardNames;

    if (!allowBEAndDFBoards && players === 2) {
      if (names.includes('B') && names.includes('E')) {
        const excluded = selectRandom(['B', 'E'])[0];
        names = names.filter((name) => name !== excluded);
      } else if (names.includes('D') && names.includes('F')) {
        const excluded = selectRandom(['D', 'F'])[0];
        names = names.filter((name) => name !== excluded);
      }
    }

    return getBoards({ names: selectRandom(names, players) });
  }
}
