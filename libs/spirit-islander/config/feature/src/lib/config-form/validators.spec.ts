import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/shared/util';

import {
  playersOutnumberSelectedBoards,
  playersOutnumberSpirits,
  playersOutnumberTotalBoards,
  required,
} from './validators';

describe('Validators', () => {
  const fbnn = new FormBuilder().nonNullable;

  describe('required', () => {
    it('returns an error if control value length is 0', () => {
      expect(required(fbnn.control([] as string[]))).toEqual({
        required: 'At least 1 option must be selected',
      });
    });

    it('returns null if control value length is at least 1', () => {
      expect(required(fbnn.control(['A', 'B']))).toBe(null);
    });
  });

  describe('playersOutnumberSpirits', () => {
    it('returns an error if player count is greater than spirits count', () => {
      expect(
        playersOutnumberSpirits(
          fbnn.group<Pick<Form<Config>, 'players' | 'spiritNames'>>({
            players: fbnn.control(2),
            spiritNames: fbnn.control(['Thunderspeaker']),
          })
        )
      ).toEqual({
        playersOutnumberSpirits: 'At least 2 spirits must be selected',
      });
    });

    it('returns null if spirits count is greater than or equal to spirits count', () => {
      expect(
        playersOutnumberSpirits(
          fbnn.group<Pick<Form<Config>, 'players' | 'spiritNames'>>({
            players: fbnn.control(1),
            spiritNames: fbnn.control(['Thunderspeaker']),
          })
        )
      ).toBe(null);
    });
  });

  describe('playersOutnumberTotalBoards', () => {
    it('returns an error if player count is greater than 4 and Jagged Earth is not included', () => {
      expect(
        playersOutnumberTotalBoards(
          fbnn.group<Pick<Form<Config>, 'expansions' | 'players'>>({
            expansions: fbnn.control([]),
            players: fbnn.control(5),
          })
        )
      ).toEqual({
        playersOutnumberTotalBoards:
          'Cannot generate a setup with more than 4 players unless playing with the Jagged Earth expansion',
      });
    });

    it('returns null if player count is greater than 4 and Jagged Earth is included', () => {
      expect(
        playersOutnumberTotalBoards(
          fbnn.group<Pick<Form<Config>, 'expansions' | 'players'>>({
            expansions: fbnn.control(['Jagged Earth']),
            players: fbnn.control(5),
          })
        )
      ).toBe(null);
    });

    it('returns null if player count is less than 5, regardless of expansions', () => {
      expect(
        playersOutnumberTotalBoards(
          fbnn.group<Pick<Form<Config>, 'expansions' | 'players'>>({
            expansions: fbnn.control([]),
            players: fbnn.control(4),
          })
        )
      ).toBe(null);
    });
  });

  describe('playersOutnumberSelectedBoards', () => {
    it('returns an error if player count is greater than boards count', () => {
      expect(
        playersOutnumberSelectedBoards(
          fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
            players: fbnn.control(2),
            boardNames: fbnn.control(['A']),
          })
        )
      ).toEqual({
        playersOutnumberSelectedBoards:
          'At least 2 boards must be selected (must match or exceed player count)',
      });
    });

    it('returns null if boards count is greater than or equal to players count', () => {
      expect(
        playersOutnumberSelectedBoards(
          fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
            players: fbnn.control(2),
            boardNames: fbnn.control(['A', 'B']),
          })
        )
      ).toBe(null);
    });
  });
});
