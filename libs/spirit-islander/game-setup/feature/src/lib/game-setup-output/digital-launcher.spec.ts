import { GameSetup } from '@atocha/spirit-islander/game-setup/util';
import {
  buildMobileLaunchUrl,
  buildSteamLaunchUrl,
  canLaunch,
} from './digital-launcher';

const setup1Player: GameSetup = {
  expansions: [],
  players: 1,
  difficulty: 0,
  spirits: [
    {
      name: "Lightning's Swift Strike",
      spiritIdentifier: 'LightningsSwiftStrike',
    },
  ],
  boards: [
    { name: 'A', thematicName: 'Northeast', thematicIdentifier: 'NorthEast' },
  ],
  map: {
    name: 'Balanced',
    difficulty: 0,
  },
  scenario: { name: 'No Scenario', difficulty: 0 },
  adversaryLevel: { difficulty: 0, id: 'none', name: 'N/A' },
};

const setup4Players: GameSetup = {
  expansions: ['Branch & Claw', 'Horizons', 'Jagged Earth'],
  players: 4,
  difficulty: 0,
  spirits: [
    {
      name: 'Grinning Trickster Stirs Up Trouble',
      expansion: 'Jagged Earth',
      spiritIdentifier: 'GrinningTricksterStirsUpTrouble',
    },
    {
      name: 'Fathomless Mud of the Swamp',
      spiritIdentifier: 'FathomlessMudOfTheSwamp',
      expansion: 'Horizons',
    },
    {
      name: 'Heart of the Wildfire',
      spiritIdentifier: 'HeartOfTheWildfire',
      expansion: 'Promo Pack 1',
    },
    {
      name: 'Reach',
      aspectOf: 'Shadows Flicker Like Flame',
      spiritIdentifier: 'ShadowsFlickerLikeFlame',
      aspectIdentifier: 'Reach',
      expansion: 'Jagged Earth',
    },
  ],
  boards: [
    { name: 'D', thematicName: 'West', thematicIdentifier: 'West' },
    { name: 'B', thematicName: 'East', thematicIdentifier: 'East' },
    { name: 'A', thematicName: 'Northeast', thematicIdentifier: 'NorthEast' },
    { name: 'C', thematicName: 'Northwest', thematicIdentifier: 'NorthWest' },
  ],
  map: {
    name: 'Thematic',
    difficulty: 1,
  },
  scenario: {
    name: 'Elemental Invocation',
    identifier: 'ElementalInvocation',
    difficulty: 0,
  },
  adversaryLevel: { difficulty: 4, id: 'en-2', name: 'Level 2', level: 2 },
};

const unsupportedSpiritSeup: GameSetup = {
  expansions: [],
  players: 1,
  difficulty: 0,
  spirits: [
    {
      name: 'Starlight Seeks Its Form',
      expansion: 'Jagged Earth',
    },
  ],
  boards: [
    { name: 'A', thematicName: 'Northeast', thematicIdentifier: 'NorthEast' },
  ],
  map: {
    name: 'Balanced',
    difficulty: 0,
  },
  scenario: { name: 'No Scenario', difficulty: 0 },
  adversaryLevel: { difficulty: 0, id: 'none', name: 'N/A' },
};

describe('when launching a digital game', () => {
  describe('canLaunch', () => {
    it('returns true when a game can be launched', () => {
      expect(canLaunch(setup1Player)).toBe(true);
      expect(canLaunch(setup4Players)).toBe(true);
    });

    it('returns fakse when a game cannnot be launched', () => {
      expect(canLaunch(unsupportedSpiritSeup)).toBe(false);
    });
  });

  describe('buildMobileLaunchUrl', () => {
    it("returns a launch URL for a 1 player game on mobile'", () => {
      const url = buildMobileLaunchUrl(setup1Player);
      expect(url).toEqual(
        'http://play.spiritislanddigital.com/screen/NewGame?spirits=LightningsSwiftStrike&aspects=&boards=A&useExpansions=&useEvents=1'
      );
    });

    it("returns a launch URL for a 4 player game on mobile'", () => {
      const url = buildMobileLaunchUrl(setup4Players);
      expect(url).toEqual(
        'http://play.spiritislanddigital.com/screen/NewGame?spirits=GrinningTricksterStirsUpTrouble,FathomlessMudOfTheSwamp,HeartOfTheWildfire,ShadowsFlickerLikeFlame&aspects=Reach&boards=West,East,NorthEast,NorthWest&adversary=TheKingdomOfEngland&adversaryLevel=2&scenario=ElementalInvocation&useExpansions=BranchAndClaw,JaggedEarth&useEvents=1'
      );
    });
  });

  describe('buildSteamLaunchUrl', () => {
    it("returns a launch URL for a 1 player game on Steam'", () => {
      const url = buildSteamLaunchUrl(setup1Player);
      expect(url).toEqual(
        'steam://run/1236720/?url=spiritisland%3A%2F%2Fscreen%2FNewGame%3Fspirits%3DLightningsSwiftStrike%26aspects%3D%26boards%3DA%26useExpansions%3D%26useEvents%3D1'
      );
    });

    it("returns a launch URL for a 4 player game on Steam'", () => {
      const url = buildSteamLaunchUrl(setup4Players);
      expect(url).toEqual(
        'steam://run/1236720/?url=spiritisland%3A%2F%2Fscreen%2FNewGame%3Fspirits%3DGrinningTricksterStirsUpTrouble%2CFathomlessMudOfTheSwamp%2CHeartOfTheWildfire%2CShadowsFlickerLikeFlame%26aspects%3DReach%26boards%3DWest%2CEast%2CNorthEast%2CNorthWest%26adversary%3DTheKingdomOfEngland%26adversaryLevel%3D2%26scenario%3DElementalInvocation%26useExpansions%3DBranchAndClaw%2CJaggedEarth%26useEvents%3D1'
      );
    });
  });
});
