import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';

import { LocalStorageService } from '@atocha/core/data-access';
import { Config } from '@atocha/spirit-islander/config/util';
import { StateService } from '@atocha/spirit-islander/shared/data-access';
import {
  playersOutnumberSelectedBoards,
  playersOutnumberSpirits,
  playersOutnumberTotalBoards,
  required,
  restrictedBoardPairing,
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
        playersOutnumberSpirits: 'At least 2 unique spirits must be selected',
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

  describe('restrictedBoardPairing', () => {
    let mockStateService: StateService;

    beforeEach(() => {
      mockStateService = new StateService(new LocalStorageService('test'));
    });

    describe('returns null', () => {
      it('when `allowBEAndDFBoards` setting is true', () => {
        mockStateService.updateSettings({ allowBEAndDFBoards: true });

        expect(
          restrictedBoardPairing(mockStateService)(
            fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
              players: fbnn.control(2),
              boardNames: fbnn.control(['A', 'B']),
            })
          )
        ).toBe(null);
      });

      it('in games with more or fewer than 2 players', () => {
        mockStateService.updateSettings({ allowBEAndDFBoards: false });

        expect(
          restrictedBoardPairing(mockStateService)(
            fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
              players: fbnn.control(1),
              boardNames: fbnn.control(['A', 'B']),
            })
          )
        ).toBe(null);

        expect(
          restrictedBoardPairing(mockStateService)(
            fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
              players: fbnn.control(3),
              boardNames: fbnn.control(['A', 'B', 'E']),
            })
          )
        ).toBe(null);
      });

      it("when restricted pairings aren't selected", () => {
        mockStateService.updateSettings({ allowBEAndDFBoards: false });

        expect(
          restrictedBoardPairing(mockStateService)(
            fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
              players: fbnn.control(2),
              boardNames: fbnn.control(['A', 'B']),
            })
          )
        ).toBe(null);
      });
    });

    describe('returns error in 2 player game with setting enabled', () => {
      it('when B and E are selected', () => {
        mockStateService.updateSettings({ allowBEAndDFBoards: false });

        expect(
          restrictedBoardPairing(mockStateService)(
            fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
              players: fbnn.control(2),
              boardNames: fbnn.control(['B', 'E']),
            })
          )
        ).toEqual({
          restrictedBoardPairing:
            'Boards B / E and boards D / F not allowed in a 2 player game',
        });
      });

      it('when D and F are selected', () => {
        mockStateService.updateSettings({ allowBEAndDFBoards: false });

        expect(
          restrictedBoardPairing(mockStateService)(
            fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
              players: fbnn.control(2),
              boardNames: fbnn.control(['D', 'F']),
            })
          )
        ).toEqual({
          restrictedBoardPairing:
            'Boards B / E and boards D / F not allowed in a 2 player game',
        });
      });
    });
  });
});
