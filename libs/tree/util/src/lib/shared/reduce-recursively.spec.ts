import { bfsReduce } from './reduce-recursively';

interface Item {
  name: string;
  description?: string;
  children?: Item[];
}

describe('bfsReduce', () => {
  let getChildren: (node: Item) => Item[];

  beforeEach(() => {
    getChildren = (node) => node?.children ?? [];
  });

  it('returns a array of only the root when it has no children', () => {
    const pusher = (accumulator: Item[], node: Item) => [...accumulator, node];

    expect(
      bfsReduce({
        root: { name: 'Item 1' },
        getChildren: getChildren,
        initialValue: [],
        reducer: pusher,
      })
    ).toEqual([{ name: 'Item 1' }]);

    expect(
      bfsReduce({
        root: { name: 'Item 2', children: [] },
        getChildren: getChildren,
        initialValue: [],
        reducer: pusher,
      })
    ).toEqual([{ name: 'Item 2', children: [] }]);
  });

  it('returns an array of nested nodes', () => {
    const item: Item = {
      name: 'Item 1',
      children: [
        { name: 'Item 1A' },
        { name: 'Item 1B' },
        { name: 'Item 1C', children: [{ name: 'Item 1C.1' }] },
      ],
    };

    expect(
      bfsReduce<Item, Item[]>({
        root: item,
        getChildren: getChildren,
        initialValue: [],
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

  it('returns an array of a property on all nodes', () => {
    const item: Item = {
      name: 'Item 1',
      children: [
        { name: 'Item 1A' },
        { name: 'Item 1B' },
        { name: 'Item 1C', children: [{ name: 'Item 1C.1' }] },
      ],
    };

    expect(
      bfsReduce<Item, string[]>({
        root: item,
        getChildren: getChildren,
        initialValue: [],
        reducer: (accumulator, item) => [...accumulator, item.name],
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
      bfsReduce<Item, Record<string, string>>({
        root: item,
        getChildren: getChildren,
        initialValue: {},
        reducer: (accumulator, node) => ({
          ...accumulator,
          [node.name]: node.description ?? 'No description',
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
