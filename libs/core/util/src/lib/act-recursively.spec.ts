import { actRecursively } from './act-recursively';

interface Item {
  name: string;
  description?: string;
  children?: Item[];
}

describe('actRecursively', () => {
  let getChildren: (item: Item) => Item[];

  beforeEach(() => {
    getChildren = (item) => item?.children ?? [];
  });

  it('returns a array of only the item when it has no children', () => {
    const pusher = (accumulator: Item[], item: Item) => [...accumulator, item];

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
    const item: Item = {
      name: 'Item 1',
      children: [
        { name: 'Item 1A' },
        { name: 'Item 1B' },
        { name: 'Item 1C', children: [{ name: 'Item 1C.1' }] },
      ],
    };
    const pusher = (accumulator: Item[], item: Item) => [...accumulator, item];

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
    const item: Item = {
      name: 'Item 1',
      children: [
        { name: 'Item 1A' },
        { name: 'Item 1B' },
        { name: 'Item 1C', children: [{ name: 'Item 1C.1' }] },
      ],
    };
    const pusher = (accumulator: string[], item: Item) => [...accumulator, item.name];

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

  it('returns an object of all items keyed by item description', () => {
    const item: Item = {
      name: 'Item 1',
      description: 'First item',
      children: [
        { name: 'Item 1A', description: 'First item A' },
        { name: 'Item 1B', description: 'First item B' },
        {
          name: 'Item 1C',
          children: [{ name: 'Item 1C.1', description: 'First item C.1' }]
        },
      ],
    };
    const recorder = (
      accumulator: Record<string, string>,
      item: Item
    ) => ({ ...accumulator, [item.name]: item.description ?? 'No description' });

    expect(actRecursively({
      item,
      getChildren,
      reducer: recorder,
      accumulator: {},
    })).toEqual({
      "Item 1": "First item",
      "Item 1A": "First item A",
      "Item 1B": "First item B",
      "Item 1C": "No description",
      "Item 1C.1": "First item C.1",
    });
  });
});
