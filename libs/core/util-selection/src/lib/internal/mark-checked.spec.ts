import { markChecked } from './mark-checked';

describe('markChecked', () => {
  describe('override functionality', () => {
    it('returns false if target is false, regardless of initial', () => {
      expect(markChecked(false, 'checked')).toBe(false);
      expect(markChecked(false, 'indeterminate')).toBe(false);
      expect(markChecked(false, undefined)).toBe(false);
    });

    it('returns true if target is true, regardless of initial', () => {
      expect(markChecked(true, 'checked')).toBe(true);
      expect(markChecked(true, 'indeterminate')).toBe(true);
      expect(markChecked(true, undefined)).toBe(true);
    });
  });

  describe('toggle functionality', () => {
    it('returns false if no target and initial is checked', () => {
      expect(markChecked(undefined, 'checked')).toBe(false);
    });

    it('returns true if no target and initial is indeterminate', () => {
      expect(markChecked(undefined, 'indeterminate')).toBe(true);
    });

    it('returns true if no target and no initial', () => {
      expect(markChecked(undefined, undefined));
    });
  });
});
