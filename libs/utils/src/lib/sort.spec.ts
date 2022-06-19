import { sort } from "./sort";

interface FakeItem {
  name: string;
  order: number;
}

describe('sort', () => {
  it('returns sorted strings when callback returns self', () => {
    const arr = ['banana', 'canteloupe', 'apple'];
    expect(sort(arr, fruit => fruit)).toEqual(['apple', 'banana', 'canteloupe']);
  });

  it('returns sorted numbers when callback returns self', () => {
    const arr = [3, 2, 1];
    expect(sort(arr, num => num)).toEqual([1, 2, 3]);
  });

  it('returns sorted items based on prop accessed by callback', () => {
    const arr: FakeItem[] = [
      { name: 'second', order: 2 },
      { name: 'first', order: 1 },
      { name: 'third', order: 3 },
    ];
    expect(sort(arr, item => item.order)).toEqual([
      { name: 'first', order: 1 },
      { name: 'second', order: 2 },
      { name: 'third', order: 3 },
    ]);
  });
});
