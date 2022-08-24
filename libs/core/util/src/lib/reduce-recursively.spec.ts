import { reduceRecursively } from './reduce-recursively';

interface Item {
  name: string;
  description?: string;
  children?: Item[];
}

describe('reduceRecursively', () => {
  let getItems: (item: Item) => Item[];

  beforeEach(() => {
    getItems = (item) => item?.children ?? [];
  });

  it('returns a array of only the item when it has no children', () => {
    const pusher = (accumulator: Item[], item: Item) => [...accumulator, item];

    expect(
      reduceRecursively({
        item: { name: 'Item 1' },
        getItems,
        initialValue: [],
        reducer: pusher,
      })
    ).toEqual([{ name: 'Item 1' }]);

    expect(
      reduceRecursively({
        item: { name: 'Item 2', children: [] },
        getItems,
        initialValue: [],
        reducer: pusher,
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

    expect(
      reduceRecursively({
        item,
        getItems,
        initialValue: [] as Item[],
        reducer: (accumulator, item) => [...accumulator, item],
      })
    ).toEqual([
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

    expect(
      reduceRecursively<Item, string[]>({
        item,
        getItems,
        initialValue: [],
        reducer: (accumulator, item) => [ ...accumulator, item.name ],
      })
    ).toEqual(['Item 1', 'Item 1A', 'Item 1B', 'Item 1C', 'Item 1C.1']);
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
          children: [{ name: 'Item 1C.1', description: 'First item C.1' }],
        },
      ],
    };

    expect(
      reduceRecursively({
        item,
        getItems,
        initialValue: {} as Record<string, string>,
        reducer: (accumulator, item) => ({
          ...accumulator,
          [item.name]: item.description ?? 'No description',
        }),
      })
    ).toEqual({
      'Item 1': 'First item',
      'Item 1A': 'First item A',
      'Item 1B': 'First item B',
      'Item 1C': 'No description',
      'Item 1C.1': 'First item C.1',
    });
  });
});
