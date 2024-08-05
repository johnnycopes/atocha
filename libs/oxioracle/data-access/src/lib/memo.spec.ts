import { memo } from './memo';

describe('memo', () => {
  it('returns "0" by default', () => {
    const incrementer = memo();

    expect(incrementer()).toBe('0');
  });

  it('returns specific number (as string) when passed in as initial value', () => {
    const incrementer = memo(5);

    expect(incrementer()).toBe('5');
  });

  it('returns initial value (as string) incremented by number of times called', () => {
    const incrementer = memo(10);

    incrementer();
    incrementer();
    incrementer();

    expect(incrementer()).toBe('13');
  });
});
