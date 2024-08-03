import { groupBy } from './group-by';

interface Person {
  name: string;
  country: string;
}

describe('groupBy', () => {
  it('returns an object of arrays keyed by a particular property name', () => {
    const people: Person[] = [
      { name: 'Bob', country: 'USA' },
      { name: 'Pepe', country: 'Mexico' },
      { name: 'Simon', country: 'Canada' },
      { name: 'Julien', country: 'Canada' },
    ];

    expect(groupBy(people, 'country')).toStrictEqual({
      Canada: [
        { name: 'Simon', country: 'Canada' },
        { name: 'Julien', country: 'Canada' },
      ],
      Mexico: [{ name: 'Pepe', country: 'Mexico' }],
      USA: [{ name: 'Bob', country: 'USA' }],
    });
  });
});
