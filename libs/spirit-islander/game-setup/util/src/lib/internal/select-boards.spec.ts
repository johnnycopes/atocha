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
        thematicName: 'Northeast',
      });
      expect(selectedBoards).toContainEqual({
        name: 'B',
        thematicName: 'East',
      });
      expect(selectedBoards).toContainEqual({
        name: 'C',
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
  });
});

describe('thematic board selection', () => {
  describe('with randomizedThematic turned off', () => {
    it('returns Northeast for 1 player', () => {
      expect(selectBoards('Thematic', 1, [])).toStrictEqual([
        { name: 'A', thematicName: 'Northeast' },
      ]);
    });

    it('returns West and East for 2 players', () => {
      expect(selectBoards('Thematic', 2, [])).toStrictEqual([
        { name: 'D', thematicName: 'West' },
        { name: 'B', thematicName: 'East' },
      ]);
    });

    it('returns West, East, and Northeast for 3 players', () => {
      expect(selectBoards('Thematic', 3, [])).toStrictEqual([
        { name: 'D', thematicName: 'West' },
        { name: 'B', thematicName: 'East' },
        { name: 'A', thematicName: 'Northeast' },
      ]);
    });

    it('returns West, East, Northeast, and Northwest for 4 players', () => {
      expect(selectBoards('Thematic', 4, [])).toStrictEqual([
        { name: 'D', thematicName: 'West' },
        { name: 'B', thematicName: 'East' },
        { name: 'A', thematicName: 'Northeast' },
        { name: 'C', thematicName: 'Northwest' },
      ]);
    });

    it('returns West, East, Northeast, Northwest, and Southwest for 5 players', () => {
      expect(selectBoards('Thematic', 5, [])).toStrictEqual([
        { name: 'D', thematicName: 'West' },
        { name: 'B', thematicName: 'East' },
        { name: 'A', thematicName: 'Northeast' },
        { name: 'C', thematicName: 'Northwest' },
        { name: 'F', thematicName: 'Southwest', expansion: 'Jagged Earth' },
      ]);
    });

    it('returns West, East, Northeast, Northwest, Southwest, and Southeast for 6 players', () => {
      expect(selectBoards('Thematic', 6, [])).toStrictEqual([
        { name: 'D', thematicName: 'West' },
        { name: 'B', thematicName: 'East' },
        { name: 'A', thematicName: 'Northeast' },
        { name: 'C', thematicName: 'Northwest' },
        { name: 'F', thematicName: 'Southwest', expansion: 'Jagged Earth' },
        { name: 'E', thematicName: 'Southeast', expansion: 'Jagged Earth' },
      ]);
    });
  });

  describe('with randomizedThematic turned on', () => {
    it('returns maps in any order for any number of players', () => {
      expect(
        selectBoards('Thematic', 6, ['A', 'B', 'C', 'D', 'E', 'F'], {
          randomizedThematic: true,
        })
      ).toEqual([
        { name: 'A', thematicName: 'Northeast' },
        { name: 'B', thematicName: 'East' },
        { name: 'C', thematicName: 'Northwest' },
        { name: 'D', thematicName: 'West' },
        {
          name: 'E',
          thematicName: 'Southeast',
          expansion: 'Jagged Earth',
        },
        {
          name: 'F',
          thematicName: 'Southwest',
          expansion: 'Jagged Earth',
        },
      ]);
    });
  });
});
