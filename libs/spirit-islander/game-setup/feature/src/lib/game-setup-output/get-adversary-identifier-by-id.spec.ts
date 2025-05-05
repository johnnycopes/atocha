import { getAdversaryIdentifierById } from './get-adversary-identifier-by-id';

describe('getAdversarIdentifierById', () => {
  it("returns 'No Adversary'", () => {
    expect(getAdversaryIdentifierById('none')).toBe(undefined);
  });

  it("returns 'TheKingdomOfBrandenburgPrussia'", () => {
    expect(getAdversaryIdentifierById('bp-0')).toBe(
      'TheKingdomOfBrandenburgPrussia'
    );
    expect(getAdversaryIdentifierById('bp-1')).toBe(
      'TheKingdomOfBrandenburgPrussia'
    );
    expect(getAdversaryIdentifierById('bp-2')).toBe(
      'TheKingdomOfBrandenburgPrussia'
    );
    expect(getAdversaryIdentifierById('bp-3')).toBe(
      'TheKingdomOfBrandenburgPrussia'
    );
    expect(getAdversaryIdentifierById('bp-4')).toBe(
      'TheKingdomOfBrandenburgPrussia'
    );
    expect(getAdversaryIdentifierById('bp-5')).toBe(
      'TheKingdomOfBrandenburgPrussia'
    );
    expect(getAdversaryIdentifierById('bp-6')).toBe(
      'TheKingdomOfBrandenburgPrussia'
    );
  });

  it("returns 'TheKingdomOfEngland'", () => {
    expect(getAdversaryIdentifierById('en-0')).toBe('TheKingdomOfEngland');
    expect(getAdversaryIdentifierById('en-1')).toBe('TheKingdomOfEngland');
    expect(getAdversaryIdentifierById('en-2')).toBe('TheKingdomOfEngland');
    expect(getAdversaryIdentifierById('en-3')).toBe('TheKingdomOfEngland');
    expect(getAdversaryIdentifierById('en-4')).toBe('TheKingdomOfEngland');
    expect(getAdversaryIdentifierById('en-5')).toBe('TheKingdomOfEngland');
    expect(getAdversaryIdentifierById('en-6')).toBe('TheKingdomOfEngland');
  });

  it("returns 'TheKingdomOfFrance'", () => {
    expect(getAdversaryIdentifierById('fr-0')).toBe('TheKingdomOfFrance');
    expect(getAdversaryIdentifierById('fr-1')).toBe('TheKingdomOfFrance');
    expect(getAdversaryIdentifierById('fr-2')).toBe('TheKingdomOfFrance');
    expect(getAdversaryIdentifierById('fr-3')).toBe('TheKingdomOfFrance');
    expect(getAdversaryIdentifierById('fr-4')).toBe('TheKingdomOfFrance');
    expect(getAdversaryIdentifierById('fr-5')).toBe('TheKingdomOfFrance');
    expect(getAdversaryIdentifierById('fr-6')).toBe('TheKingdomOfFrance');
  });

  it("returns 'TheHabsburgMonarchy'", () => {
    expect(getAdversaryIdentifierById('hm-0')).toBe('TheHabsburgMonarchy');
    expect(getAdversaryIdentifierById('hm-1')).toBe('TheHabsburgMonarchy');
    expect(getAdversaryIdentifierById('hm-2')).toBe('TheHabsburgMonarchy');
    expect(getAdversaryIdentifierById('hm-3')).toBe('TheHabsburgMonarchy');
    expect(getAdversaryIdentifierById('hm-4')).toBe('TheHabsburgMonarchy');
    expect(getAdversaryIdentifierById('hm-5')).toBe('TheHabsburgMonarchy');
    expect(getAdversaryIdentifierById('hm-6')).toBe('TheHabsburgMonarchy');
  });

  it("returns 'TheTsardomOfRussia'", () => {
    expect(getAdversaryIdentifierById('ru-0')).toBe('TheTsardomOfRussia');
    expect(getAdversaryIdentifierById('ru-1')).toBe('TheTsardomOfRussia');
    expect(getAdversaryIdentifierById('ru-2')).toBe('TheTsardomOfRussia');
    expect(getAdversaryIdentifierById('ru-3')).toBe('TheTsardomOfRussia');
    expect(getAdversaryIdentifierById('ru-4')).toBe('TheTsardomOfRussia');
    expect(getAdversaryIdentifierById('ru-5')).toBe('TheTsardomOfRussia');
    expect(getAdversaryIdentifierById('ru-6')).toBe('TheTsardomOfRussia');
  });

  it("returns 'TheKingdomOfSweden'", () => {
    expect(getAdversaryIdentifierById('sw-0')).toBe('TheKingdomOfSweden');
    expect(getAdversaryIdentifierById('sw-1')).toBe('TheKingdomOfSweden');
    expect(getAdversaryIdentifierById('sw-2')).toBe('TheKingdomOfSweden');
    expect(getAdversaryIdentifierById('sw-3')).toBe('TheKingdomOfSweden');
    expect(getAdversaryIdentifierById('sw-4')).toBe('TheKingdomOfSweden');
    expect(getAdversaryIdentifierById('sw-5')).toBe('TheKingdomOfSweden');
    expect(getAdversaryIdentifierById('sw-6')).toBe('TheKingdomOfSweden');
  });
});
