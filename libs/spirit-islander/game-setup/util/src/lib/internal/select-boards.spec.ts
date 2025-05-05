import { getBoards } from '@atocha/spirit-islander/shared/util';
import { selectBoards } from './select-boards';

// Mock `selectRandom` to return collection untouched for predictability in testing
import * as selectRandom from './select-random';

jest
  .spyOn(selectRandom, 'selectRandom')
  .mockImplementation((options, quantity = 1) => {
    if (quantity > options.length) {
      throw new Error('More options requested than available');
    }
    return options.slice(0, quantity);
  });

describe('selectBoards', () => {
  describe('balanced board selection', () => {
    it('returns specific selection of maps', () => {
      const selectedBoards = selectBoards('Balanced', 3, ['A', 'B', 'C']);
      expect(selectedBoards).toHaveLength(3);
      expect(selectedBoards).toContainEqual({
        name: 'A',
        thematicIdentifier: 'NorthEast',
        thematicName: 'Northeast',
      });
      expect(selectedBoards).toContainEqual({
        name: 'B',
        thematicIdentifier: 'East',
        thematicName: 'East',
      });
      expect(selectedBoards).toContainEqual({
        name: 'C',
        thematicIdentifier: 'NorthWest',
        thematicName: 'Northwest',
      });
    });

    it('returns random selection of maps', () => {
      const selectedBoards = selectBoards('Balanced', 2, [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
      ]);
      expect(selectedBoards).toHaveLength(2);
      expect(getBoards()).toContainEqual(selectedBoards[0]);
      expect(getBoards()).toContainEqual(selectedBoards[1]);
    });

    describe('with `allowBEAndDFBoards` settings turned on', () => {
      it('throws error if B and E are the only selected boards with 2 players', () => {
        expect(() =>
          selectBoards('Balanced', 2, ['B', 'E'], {
            randomThematicBoards: false,
            allowBEAndDFBoards: false,
          })
        ).toThrowError(
          'Board pairings B/E and D/F are not permitted in a 2 player game'
        );
      });

      it('throws error if D and F are the only selected boards with 2 players', () => {
        expect(() =>
          selectBoards('Balanced', 2, ['D', 'F'], {
            randomThematicBoards: false,
            allowBEAndDFBoards: false,
          })
        ).toThrowError(
          'Board pairings B/E and D/F are not permitted in a 2 player game'
        );
      });

      it('avoids pairing B and E with 2 players', () => {
        const selectedBoards = selectBoards('Balanced', 2, ['A', 'B', 'E'], {
          randomThematicBoards: false,
          allowBEAndDFBoards: false,
        });
        expect(selectedBoards).toStrictEqual([
          {
            name: 'A',
            thematicName: 'Northeast',
            thematicIdentifier: 'NorthEast',
          },
          {
            name: 'E',
            thematicName: 'Southeast',
            thematicIdentifier: 'SouthEast',
            expansion: 'Jagged Earth',
          },
        ]);
      });

      it('avoids pairing D and F with 2 players', () => {
        const selectedBoards = selectBoards('Balanced', 2, ['A', 'D', 'F'], {
          randomThematicBoards: false,
          allowBEAndDFBoards: false,
        });
        expect(selectedBoards).toStrictEqual([
          {
            name: 'A',
            thematicName: 'Northeast',
            thematicIdentifier: 'NorthEast',
          },
          {
            name: 'F',
            thematicName: 'Southwest',
            thematicIdentifier: 'SouthWest',
            expansion: 'Jagged Earth',
          },
        ]);
      });
    });
  });
});

describe('thematic board selection', () => {
  describe('with randomizedThematic turned off', () => {
    it('returns Northeast for 1 player', () => {
      expect(selectBoards('Thematic', 1, [])).toStrictEqual([
        {
          name: 'A',
          thematicIdentifier: 'NorthEast',
          thematicName: 'Northeast',
        },
      ]);
    });

    it('returns West and East for 2 players', () => {
      expect(selectBoards('Thematic', 2, [])).toStrictEqual([
        { name: 'D', thematicIdentifier: 'West', thematicName: 'West' },
        { name: 'B', thematicIdentifier: 'East', thematicName: 'East' },
      ]);
    });

    it('returns West, East, and Northeast for 3 players', () => {
      expect(selectBoards('Thematic', 3, [])).toStrictEqual([
        { name: 'D', thematicIdentifier: 'West', thematicName: 'West' },
        { name: 'B', thematicIdentifier: 'East', thematicName: 'East' },
        {
          name: 'A',
          thematicIdentifier: 'NorthEast',
          thematicName: 'Northeast',
        },
      ]);
    });

    it('returns West, East, Northeast, and Northwest for 4 players', () => {
      expect(selectBoards('Thematic', 4, [])).toStrictEqual([
        { name: 'D', thematicIdentifier: 'West', thematicName: 'West' },
        { name: 'B', thematicIdentifier: 'East', thematicName: 'East' },
        {
          name: 'A',
          thematicIdentifier: 'NorthEast',
          thematicName: 'Northeast',
        },
        {
          name: 'C',
          thematicIdentifier: 'NorthWest',
          thematicName: 'Northwest',
        },
      ]);
    });

    it('returns West, East, Northeast, Northwest, and Southwest for 5 players', () => {
      expect(selectBoards('Thematic', 5, [])).toStrictEqual([
        { name: 'D', thematicIdentifier: 'West', thematicName: 'West' },
        { name: 'B', thematicIdentifier: 'East', thematicName: 'East' },
        {
          name: 'A',
          thematicIdentifier: 'NorthEast',
          thematicName: 'Northeast',
        },
        {
          name: 'C',
          thematicIdentifier: 'NorthWest',
          thematicName: 'Northwest',
        },
        {
          name: 'F',
          thematicIdentifier: 'SouthWest',
          thematicName: 'Southwest',
          expansion: 'Jagged Earth',
        },
      ]);
    });

    it('returns West, East, Northeast, Northwest, Southwest, and Southeast for 6 players', () => {
      expect(selectBoards('Thematic', 6, [])).toStrictEqual([
        { name: 'D', thematicIdentifier: 'West', thematicName: 'West' },
        { name: 'B', thematicIdentifier: 'East', thematicName: 'East' },
        {
          name: 'A',
          thematicIdentifier: 'NorthEast',
          thematicName: 'Northeast',
        },
        {
          name: 'C',
          thematicIdentifier: 'NorthWest',
          thematicName: 'Northwest',
        },
        {
          name: 'F',
          thematicIdentifier: 'SouthWest',
          thematicName: 'Southwest',
          expansion: 'Jagged Earth',
        },
        {
          name: 'E',
          thematicIdentifier: 'SouthEast',
          thematicName: 'Southeast',
          expansion: 'Jagged Earth',
        },
      ]);
    });
  });

  describe('with randomThematicBoards turned on', () => {
    it('returns maps in any order for any number of players', () => {
      expect(
        selectBoards('Thematic', 6, ['A', 'B', 'C', 'D', 'E', 'F'], {
          randomThematicBoards: true,
          allowBEAndDFBoards: true,
        })
      ).toStrictEqual([
        {
          name: 'A',
          thematicIdentifier: 'NorthEast',
          thematicName: 'Northeast',
        },
        { name: 'B', thematicIdentifier: 'East', thematicName: 'East' },
        {
          name: 'C',
          thematicIdentifier: 'NorthWest',
          thematicName: 'Northwest',
        },
        { name: 'D', thematicIdentifier: 'West', thematicName: 'West' },
        {
          name: 'E',
          thematicName: 'Southeast',
          thematicIdentifier: 'SouthEast',
          expansion: 'Jagged Earth',
        },
        {
          name: 'F',
          thematicName: 'Southwest',
          thematicIdentifier: 'SouthWest',
          expansion: 'Jagged Earth',
        },
      ]);
    });
  });
});
