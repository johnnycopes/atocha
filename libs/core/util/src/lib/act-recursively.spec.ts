import { actRecursively } from './act-recursively';

interface TestItem {
  name: string;
  children?: TestItem[];
}

describe('actRecursively', () => {
  let getChildren: (item: TestItem) => TestItem[];

  beforeEach(() => {
    getChildren = (item) => item?.children ?? [];
  });

  it('returns a array of only the item when it has no children', () => {
    const pusher = (accumulator: TestItem[], item: TestItem) => [...accumulator, item];

    expect(actRecursively({
      item: { name: 'Item 1' },
      getChildren,
      reducer: pusher,
      accumulator: [],
    })).toEqual([{ name: 'Item 1' }]);

    expect(
      actRecursively({
        item: { name: 'Item 2', children: [] },
        getChildren,
        reducer: pusher,
        accumulator: [],
      })
    ).toEqual([{ name: 'Item 2', children: [] }]);
  });

  it('returns an array of nested items', () => {
    const item: TestItem = {
      name: 'Item 1',
      children: [
        { name: 'Item 1A' },
        { name: 'Item 1B' },
        { name: 'Item 1C', children: [{ name: 'Item 1C.1' }] },
      ],
    };
    const pusher = (accumulator: TestItem[], item: TestItem) => [...accumulator, item];

    expect(actRecursively({
      item,
      getChildren,
      reducer: pusher,
      accumulator: [],
    })).toEqual([
      {
        name: 'Item 1',
        children: [
          { name: 'Item 1A' },
          { name: 'Item 1B' },
          { name: 'Item 1C', children: [{ name: 'Item 1C.1' }] },
        ],
      },
      { name: 'Item 1A' },
      { name: 'Item 1B' },
      { name: 'Item 1C', children: [{ name: 'Item 1C.1' }] },
      { name: 'Item 1C.1' },
    ]);
  });

  it('returns an array of a property on all items', () => {
    const item: TestItem = {
      name: 'Item 1',
      children: [
        { name: 'Item 1A' },
        { name: 'Item 1B' },
        { name: 'Item 1C', children: [{ name: 'Item 1C.1' }] },
      ],
    };
    const pusher = (accumulator: string[], item: TestItem) => [...accumulator, item.name];

    expect(actRecursively({
      item,
      getChildren,
      reducer: pusher,
      accumulator: [],
    })).toEqual([
      'Item 1',
      'Item 1A',
      'Item 1B',
      'Item 1C',
      'Item 1C.1',
    ]);
  });
});
