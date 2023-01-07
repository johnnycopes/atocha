import { Counter } from './counter';
import {
  AFRICA,
  ALL_SELECTED_MODEL,
  getChildren,
  getCounts,
  getId,
  SOME_SELECTED_MODEL,
} from '../checkbox-tree/mock-data';

describe('Counter', () => {
  let counter = new Counter(getId, getChildren, getCounts);

  beforeEach(() => {
    counter = new Counter(getId, getChildren, getCounts);
  });

  describe('getTotalCounts', () => {
    it('returns total counts record', () => {
      expect(counter.getTotalCounts(AFRICA)).toEqual({
        Africa: 130,
        'Central Africa': 65,
        Fes: 11,
        Marrakesh: 9,
        Morocco: 20,
        Namibia: 17,
        'Northern Africa': 20,
        'Southern Africa': 45,
        Swaziland: 28,
      });
    });
  });

  describe('getSelectedCounts', () => {
    it('returns selected counts record with empty model', () => {
      expect(counter.getSelectedCounts(AFRICA, [])).toEqual({
        Africa: 0,
        'Central Africa': 0,
        Fes: 0,
        Marrakesh: 0,
        Morocco: 0,
        Namibia: 0,
        'Northern Africa': 0,
        'Southern Africa': 0,
        Swaziland: 0,
      });
    });

    it('returns selected counts record with partial model', () => {
      expect(counter.getSelectedCounts(AFRICA, SOME_SELECTED_MODEL)).toEqual({
        Africa: 39,
        'Central Africa': 0,
        Fes: 11,
        Marrakesh: 0,
        Morocco: 11,
        Namibia: 0,
        'Northern Africa': 11,
        'Southern Africa': 28,
        Swaziland: 28,
      });
    });

    it('returns selected counts record with full model', () => {
      expect(counter.getSelectedCounts(AFRICA, ALL_SELECTED_MODEL)).toEqual({
        Africa: 130,
        'Central Africa': 65,
        Fes: 11,
        Marrakesh: 9,
        Morocco: 20,
        Namibia: 17,
        'Northern Africa': 20,
        'Southern Africa': 45,
        Swaziland: 28,
      });
    });
  });
});
