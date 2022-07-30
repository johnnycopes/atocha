import { trackByFactory } from "./track-by-factory";

interface FakeItem {
  prop: string;
}

describe('trackByFactory', () => {
  it('creates a function that tracks by item itself', () => {
    const trackBySelf = trackByFactory<string>(item => item);
    expect(trackBySelf(1, 'first')).toBe('first');
    expect(trackBySelf(2, 'second')).toBe('second');
  })

  it('creates a function that tracks by item property', () => {
    const trackByProp = trackByFactory<FakeItem>(item => item.prop);
    expect(trackByProp(1, { prop: 'first' })).toBe('first');
    expect(trackByProp(2, { prop: 'second' })).toBe('second');
  });
});
