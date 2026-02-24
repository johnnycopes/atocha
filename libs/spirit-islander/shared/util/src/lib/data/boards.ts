export const BOARDS = [
  {
    name: 'A',
    thematicName: 'Northeast',
    thematicIdentifier: 'NorthEast',
  },
  {
    name: 'B',
    thematicName: 'East',
    thematicIdentifier: 'East',
  },
  {
    name: 'C',
    thematicName: 'Northwest',
    thematicIdentifier: 'NorthWest',
  },
  {
    name: 'D',
    thematicName: 'West',
    thematicIdentifier: 'West',
  },
  {
    name: 'E',
    thematicIdentifier: 'SouthEast',
    thematicName: 'Southeast',
    expansion: 'Jagged Earth',
  },
  {
    name: 'F',
    thematicName: 'Southwest',
    thematicIdentifier: 'SouthWest',
    expansion: 'Jagged Earth',
  },
] as const;
