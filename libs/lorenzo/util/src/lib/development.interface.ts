export interface Development {
  number: number;
  type: 'territory' | 'building' | 'character' | 'venture';
  cost: string;
  immediateEffect?: string;
  permanentEffect?: string;
}
