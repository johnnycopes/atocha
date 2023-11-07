import { Counter } from './counter';
import {
  getId,
  getChildren,
  getTargetCount,
  AFRICA,
  ALL_SELECTED_IDS_ARRAY,
  SOME_SELECTED_IDS_ARRAY,
} from './shared/mock-data';

describe('Counter', () => {
  describe('initializing', () => {
    it('returns total counts when passed empty IDs collection', () => {
      const counter = new Counter(AFRICA, getId, getChildren, getTargetCount);

      expect(counter.totalCounts).toEqual({
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
      expect(counter.selectedCounts).toEqual({
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
  });

  describe('updating', () => {
    it('returns correct counts records after updating to partial IDs collection', () => {
      const counter = new Counter(AFRICA, getId, getChildren, getTargetCount);

      counter.update(SOME_SELECTED_IDS_ARRAY);

      expect(counter.totalCounts).toEqual({
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
      expect(counter.selectedCounts).toEqual({
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

    it('returns correct counts records after updating to full IDs collection', () => {
      const counter = new Counter(AFRICA, getId, getChildren, getTargetCount);

      counter.update(ALL_SELECTED_IDS_ARRAY);

      expect(counter.totalCounts).toEqual({
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
      expect(counter.selectedCounts).toEqual({
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
