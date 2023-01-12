import { FormControl, FormGroup } from '@angular/forms';

import {
  playersOutnumberSelectedBoards,
  playersOutnumberSpirits,
  playersOutnumberTotalBoards,
  required,
} from './validators';

describe('Validators', () => {
  describe('required', () => {
    it('returns an error if control value length is 0', () => {
      expect(required(new FormControl([]))).toEqual({
        required: 'At least 1 option must be selected',
      });
    });

    it('returns null if control value length is at least 1', () => {
      expect(required(new FormControl(['A', 'B']))).toBe(null);
    });
  });

  describe('playersOutnumberSpirits', () => {
    it('returns an error if player count is greater than spirits count', () => {
      expect(
        playersOutnumberSpirits(
          new FormGroup({
            players: new FormControl(2),
            spiritNames: new FormControl(['Thunderspeaker']),
          })
        )
      ).toEqual({
        playersOutnumberSpirits: 'At least 2 spirits must be selected',
      });
    });

    it('returns null if spirits count is greater than or equal to spirits count', () => {
      expect(
        playersOutnumberSelectedBoards(
          new FormGroup({
            players: new FormControl(1),
            spiritNames: new FormControl(['Thunderspeaker']),
          })
        )
      ).toBe(null);
    });
  });

  describe('playersOutnumberTotalBoards', () => {
    it('returns an error if player count is greater than 4 and Jagged Earth is not included', () => {
      expect(
        playersOutnumberTotalBoards(
          new FormGroup({
            expansions: new FormControl([]),
            players: new FormControl(5),
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
          new FormGroup({
            expansions: new FormControl(['Jagged Earth']),
            players: new FormControl(5),
          })
        )
      ).toBe(null);
    });

    it('returns null if player count is less than 5, regardless of expansions', () => {
      expect(
        playersOutnumberTotalBoards(
          new FormGroup({
            expansions: new FormControl([]),
            players: new FormControl(4),
          })
        )
      ).toBe(null);
    });
  });

  describe('playersOutnumberSelectedBoards', () => {
    it('returns an error if player count is greater than boards count', () => {
      expect(
        playersOutnumberSelectedBoards(
          new FormGroup({
            players: new FormControl(2),
            boardNames: new FormControl(['A']),
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
          new FormGroup({
            players: new FormControl(2),
            boardNames: new FormControl(['A', 'B']),
          })
        )
      ).toBe(null);
    });
  });
});
