type Type = 'territory' | 'building' | 'character' | 'venture';

export interface Development {
  number: number;
  period: 1 | 2 | 3;
  deck: Type | 'special';
  type: Type;
  cost?: string;
  immediateEffect?: string;
  permanentEffect?: string;
}
