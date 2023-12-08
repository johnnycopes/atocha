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
      const includesBAndE = names.includes('B') && names.includes('E');
      const includesDAndF = names.includes('D') && names.includes('F');

      if ((includesBAndE || includesDAndF) && names.length === 2) {
        throw new Error(
          'Board pairings B/E and D/F are not permitted in a 2 player game'
        );
      } else if (includesBAndE) {
        const excluded = selectRandom(['B', 'E'])[0];
        names = names.filter((name) => name !== excluded);
      } else if (includesDAndF) {
        const excluded = selectRandom(['D', 'F'])[0];
        names = names.filter((name) => name !== excluded);
      }
    }

    return getBoards({ names: selectRandom(names, players) });
  }
}
