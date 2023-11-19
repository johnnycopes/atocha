import { getAdversaryNameById } from './get-adversary-name-by-id';

describe('getAdversaryNameById', () => {
  it("returns 'No Adversary'", () => {
    expect(getAdversaryNameById('none')).toBe('No Adversary');
  });

  it("returns 'Brandenburg-Prussia'", () => {
    expect(getAdversaryNameById('bp-0')).toBe('Brandenburg-Prussia');
    expect(getAdversaryNameById('bp-1')).toBe('Brandenburg-Prussia');
    expect(getAdversaryNameById('bp-2')).toBe('Brandenburg-Prussia');
    expect(getAdversaryNameById('bp-3')).toBe('Brandenburg-Prussia');
    expect(getAdversaryNameById('bp-4')).toBe('Brandenburg-Prussia');
    expect(getAdversaryNameById('bp-5')).toBe('Brandenburg-Prussia');
    expect(getAdversaryNameById('bp-6')).toBe('Brandenburg-Prussia');
  });

  it("returns 'England'", () => {
    expect(getAdversaryNameById('en-0')).toBe('England');
    expect(getAdversaryNameById('en-1')).toBe('England');
    expect(getAdversaryNameById('en-2')).toBe('England');
    expect(getAdversaryNameById('en-3')).toBe('England');
    expect(getAdversaryNameById('en-4')).toBe('England');
    expect(getAdversaryNameById('en-5')).toBe('England');
    expect(getAdversaryNameById('en-6')).toBe('England');
  });

  it("returns 'France'", () => {
    expect(getAdversaryNameById('fr-0')).toBe('France');
    expect(getAdversaryNameById('fr-1')).toBe('France');
    expect(getAdversaryNameById('fr-2')).toBe('France');
    expect(getAdversaryNameById('fr-3')).toBe('France');
    expect(getAdversaryNameById('fr-4')).toBe('France');
    expect(getAdversaryNameById('fr-5')).toBe('France');
    expect(getAdversaryNameById('fr-6')).toBe('France');
  });

  it("returns 'Habsburg Monarchy'", () => {
    expect(getAdversaryNameById('hm-0')).toBe('Habsburg Monarchy');
    expect(getAdversaryNameById('hm-1')).toBe('Habsburg Monarchy');
    expect(getAdversaryNameById('hm-2')).toBe('Habsburg Monarchy');
    expect(getAdversaryNameById('hm-3')).toBe('Habsburg Monarchy');
    expect(getAdversaryNameById('hm-4')).toBe('Habsburg Monarchy');
    expect(getAdversaryNameById('hm-5')).toBe('Habsburg Monarchy');
    expect(getAdversaryNameById('hm-6')).toBe('Habsburg Monarchy');
  });

  it("returns 'Russia'", () => {
    expect(getAdversaryNameById('ru-0')).toBe('Russia');
    expect(getAdversaryNameById('ru-1')).toBe('Russia');
    expect(getAdversaryNameById('ru-2')).toBe('Russia');
    expect(getAdversaryNameById('ru-3')).toBe('Russia');
    expect(getAdversaryNameById('ru-4')).toBe('Russia');
    expect(getAdversaryNameById('ru-5')).toBe('Russia');
    expect(getAdversaryNameById('ru-6')).toBe('Russia');
  });

  it("returns 'Scotland'", () => {
    expect(getAdversaryNameById('sc-0')).toBe('Scotland');
    expect(getAdversaryNameById('sc-1')).toBe('Scotland');
    expect(getAdversaryNameById('sc-2')).toBe('Scotland');
    expect(getAdversaryNameById('sc-3')).toBe('Scotland');
    expect(getAdversaryNameById('sc-4')).toBe('Scotland');
    expect(getAdversaryNameById('sc-5')).toBe('Scotland');
    expect(getAdversaryNameById('sc-6')).toBe('Scotland');
  });

  it("returns 'Sweden'", () => {
    expect(getAdversaryNameById('sw-0')).toBe('Sweden');
    expect(getAdversaryNameById('sw-1')).toBe('Sweden');
    expect(getAdversaryNameById('sw-2')).toBe('Sweden');
    expect(getAdversaryNameById('sw-3')).toBe('Sweden');
    expect(getAdversaryNameById('sw-4')).toBe('Sweden');
    expect(getAdversaryNameById('sw-5')).toBe('Sweden');
    expect(getAdversaryNameById('sw-6')).toBe('Sweden');
  });
});
