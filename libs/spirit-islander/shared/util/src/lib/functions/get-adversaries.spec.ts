import { ADVERSARIES } from '../data';
import { getAdversaries } from './get-adversaries';

describe('getAdversaries', () => {
  it('returns all boards if expansions argument is omitted', () => {
    expect(getAdversaries()).toStrictEqual(ADVERSARIES);
  });

  it('returns adversaries from base game', () => {
    expect(getAdversaries({ expansions: [] })).toStrictEqual([
      {
        name: 'No Adversary',
        levels: [{ id: 'none', name: 'N/A', difficulty: 0 }],
      },
      {
        name: 'Brandenburg-Prussia',
        identifier: 'TheKingdomOfBrandenburgPrussia',
        levels: [
          { id: 'bp-0', name: 'Level 0', level: 0, difficulty: 1 },
          { id: 'bp-1', name: 'Level 1', level: 1, difficulty: 2 },
          { id: 'bp-2', name: 'Level 2', level: 2, difficulty: 4 },
          { id: 'bp-3', name: 'Level 3', level: 3, difficulty: 6 },
          { id: 'bp-4', name: 'Level 4', level: 4, difficulty: 7 },
          { id: 'bp-5', name: 'Level 5', level: 5, difficulty: 9 },
          { id: 'bp-6', name: 'Level 6', level: 6, difficulty: 10 },
        ],
      },
      {
        name: 'England',
        identifier: 'TheKingdomOfEngland',
        levels: [
          { id: 'en-0', name: 'Level 0', level: 0, difficulty: 1 },
          { id: 'en-1', name: 'Level 1', level: 1, difficulty: 3 },
          { id: 'en-2', name: 'Level 2', level: 2, difficulty: 4 },
          { id: 'en-3', name: 'Level 3', level: 3, difficulty: 6 },
          { id: 'en-4', name: 'Level 4', level: 4, difficulty: 7 },
          { id: 'en-5', name: 'Level 5', level: 5, difficulty: 9 },
          { id: 'en-6', name: 'Level 6', level: 6, difficulty: 11 },
        ],
      },
      {
        name: 'Sweden',
        identifier: 'TheKingdomOfSweden',
        levels: [
          { id: 'sw-0', name: 'Level 0', level: 0, difficulty: 1 },
          { id: 'sw-1', name: 'Level 1', level: 1, difficulty: 2 },
          { id: 'sw-2', name: 'Level 2', level: 2, difficulty: 3 },
          { id: 'sw-3', name: 'Level 3', level: 3, difficulty: 5 },
          { id: 'sw-4', name: 'Level 4', level: 4, difficulty: 6 },
          { id: 'sw-5', name: 'Level 5', level: 5, difficulty: 7 },
          { id: 'sw-6', name: 'Level 6', level: 6, difficulty: 8 },
        ],
      },
    ]);
  });

  it('returns adversaries from base game plus any specified expansions', () => {
    expect(getAdversaries({ expansions: ['Branch & Claw'] })).toStrictEqual([
      {
        name: 'No Adversary',
        levels: [{ id: 'none', name: 'N/A', difficulty: 0 }],
      },
      {
        name: 'Brandenburg-Prussia',
        identifier: 'TheKingdomOfBrandenburgPrussia',
        levels: [
          { id: 'bp-0', name: 'Level 0', level: 0, difficulty: 1 },
          { id: 'bp-1', name: 'Level 1', level: 1, difficulty: 2 },
          { id: 'bp-2', name: 'Level 2', level: 2, difficulty: 4 },
          { id: 'bp-3', name: 'Level 3', level: 3, difficulty: 6 },
          { id: 'bp-4', name: 'Level 4', level: 4, difficulty: 7 },
          { id: 'bp-5', name: 'Level 5', level: 5, difficulty: 9 },
          { id: 'bp-6', name: 'Level 6', level: 6, difficulty: 10 },
        ],
      },
      {
        name: 'England',
        identifier: 'TheKingdomOfEngland',
        levels: [
          { id: 'en-0', name: 'Level 0', level: 0, difficulty: 1 },
          { id: 'en-1', name: 'Level 1', level: 1, difficulty: 3 },
          { id: 'en-2', name: 'Level 2', level: 2, difficulty: 4 },
          { id: 'en-3', name: 'Level 3', level: 3, difficulty: 6 },
          { id: 'en-4', name: 'Level 4', level: 4, difficulty: 7 },
          { id: 'en-5', name: 'Level 5', level: 5, difficulty: 9 },
          { id: 'en-6', name: 'Level 6', level: 6, difficulty: 11 },
        ],
      },
      {
        name: 'France',
        identifier: 'TheKingdomOfFrance',
        expansion: 'Branch & Claw',
        levels: [
          { id: 'fr-0', name: 'Level 0', level: 0, difficulty: 2 },
          { id: 'fr-1', name: 'Level 1', level: 1, difficulty: 3 },
          { id: 'fr-2', name: 'Level 2', level: 2, difficulty: 5 },
          { id: 'fr-3', name: 'Level 3', level: 3, difficulty: 7 },
          { id: 'fr-4', name: 'Level 4', level: 4, difficulty: 8 },
          { id: 'fr-5', name: 'Level 5', level: 5, difficulty: 9 },
          { id: 'fr-6', name: 'Level 6', level: 6, difficulty: 10 },
        ],
      },
      {
        name: 'Sweden',
        identifier: 'TheKingdomOfSweden',
        levels: [
          { id: 'sw-0', name: 'Level 0', level: 0, difficulty: 1 },
          { id: 'sw-1', name: 'Level 1', level: 1, difficulty: 2 },
          { id: 'sw-2', name: 'Level 2', level: 2, difficulty: 3 },
          { id: 'sw-3', name: 'Level 3', level: 3, difficulty: 5 },
          { id: 'sw-4', name: 'Level 4', level: 4, difficulty: 6 },
          { id: 'sw-5', name: 'Level 5', level: 5, difficulty: 7 },
          { id: 'sw-6', name: 'Level 6', level: 6, difficulty: 8 },
        ],
      },
    ]);
  });

  it('returns adversaries with certain names', () => {
    expect(getAdversaries({ names: ['Russia'] })).toStrictEqual([
      {
        name: 'Russia',
        identifier: 'TheTsardomOfRussia',
        expansion: 'Jagged Earth',
        levels: [
          { id: 'ru-0', name: 'Level 0', level: 0, difficulty: 1 },
          { id: 'ru-1', name: 'Level 1', level: 1, difficulty: 3 },
          { id: 'ru-2', name: 'Level 2', level: 2, difficulty: 4 },
          { id: 'ru-3', name: 'Level 3', level: 3, difficulty: 6 },
          { id: 'ru-4', name: 'Level 4', level: 4, difficulty: 7 },
          { id: 'ru-5', name: 'Level 5', level: 5, difficulty: 9 },
          { id: 'ru-6', name: 'Level 6', level: 6, difficulty: 11 },
        ],
      },
    ]);
  });
});
