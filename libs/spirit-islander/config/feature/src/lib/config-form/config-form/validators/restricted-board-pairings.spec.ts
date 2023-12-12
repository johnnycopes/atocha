import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/config/util';
import { restrictedBoardPairings } from './restricted-board-pairings';

describe('restrictedBoardPairings', () => {
  const fb = new FormBuilder().nonNullable;

  describe('returns null', () => {
    it('when `allowBEAndDFBoards` setting is true', () => {
      expect(
        restrictedBoardPairings(true)(
          fb.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
            players: fb.control(2),
            boardNames: fb.control(['B', 'E']),
          })
        )
      ).toBe(null);
    });

    it('in games with more or fewer than 2 players', () => {
      expect(
        restrictedBoardPairings(false)(
          fb.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
            players: fb.control(1),
            boardNames: fb.control(['B', 'E']),
          })
        )
      ).toBe(null);

      expect(
        restrictedBoardPairings(false)(
          fb.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
            players: fb.control(3),
            boardNames: fb.control(['A', 'B', 'E']),
          })
        )
      ).toBe(null);
    });

    it("when restricted pairings aren't selected", () => {
      expect(
        restrictedBoardPairings(false)(
          fb.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
            players: fb.control(2),
            boardNames: fb.control(['A', 'B']),
          })
        )
      ).toBe(null);
    });
  });

  describe('returns error in 2 player game with setting enabled', () => {
    it('when B and E are selected', () => {
      expect(
        restrictedBoardPairings(false)(
          fb.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
            players: fb.control(2),
            boardNames: fb.control(['B', 'E']),
          })
        )
      ).toEqual({
        restrictedBoardPairings:
          'Boards B/E and D/F not allowed in a 2 player game',
      });
    });

    it('when D and F are selected', () => {
      expect(
        restrictedBoardPairings(false)(
          fb.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
            players: fb.control(2),
            boardNames: fb.control(['D', 'F']),
          })
        )
      ).toEqual({
        restrictedBoardPairings:
          'Boards B/E and D/F not allowed in a 2 player game',
      });
    });
  });
});
