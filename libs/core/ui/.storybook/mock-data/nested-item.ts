
export interface NestedItem {
  id: string;
  children?: NestedItem[];
}

export const NESTED_ITEM: NestedItem = {
  id: 'Africa',
  children: [
    {
      id: 'Southern Africa',
      children: [
        { id: 'Swaziland' },
        { id: 'Namibia' },
      ],
    },
    { id: 'Central Africa' },
    {
      id: 'Northern Africa',
      children: [
        {
          id: 'Morocco',
          children: [
            { id: 'Marrakesh' },
            { id: 'Fes' },
          ],
        },
      ],
    },
  ],
};
