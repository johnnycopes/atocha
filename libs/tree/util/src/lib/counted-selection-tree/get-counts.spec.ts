import { getCounts } from './get-counts';
import {
  AFRICA,
  getChildren,
  getId,
  getTargetCount,
} from '../shared/mock-data';

describe('getCounts', () => {
  it('returns total counts record based on number of children', () => {
    expect(
      getCounts(
        AFRICA,
        getId,
        getChildren,
        (node) => node.children?.length ?? 0
      )
    ).toStrictEqual({
      Africa: 8,
      'Central Africa': 0,
      Fes: 0,
      Marrakesh: 0,
      Morocco: 2,
      Namibia: 0,
      'Northern Africa': 3,
      'Southern Africa': 2,
      Swaziland: 0,
    });
  });

  it('returns total counts record based on arbitrary targets property', () => {
    expect(getCounts(AFRICA, getId, getChildren, getTargetCount)).toStrictEqual(
      {
        Africa: 130,
        'Central Africa': 65,
        Fes: 11,
        Marrakesh: 9,
        Morocco: 20,
        Namibia: 17,
        'Northern Africa': 20,
        'Southern Africa': 45,
        Swaziland: 28,
      }
    );
  });
});
