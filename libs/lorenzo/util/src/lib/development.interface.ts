type Type = 'territory' | 'building' | 'character' | 'venture';

export interface Development {
  /** The unique number printed near the top right corner of the card */
  id: string;
  /** The large Roman numeral printed on the back of the card */
  period: 1 | 2 | 3;
  /** The type of deck the card belongs to, indicated by the color of the back of the card */
  deck: Type | 'special';
  /** The type of the card itself, indicated by the color on the front of the card */
  type: Type;
  /** How much it costs to purchase the card, printed in near the top left corner of the card (Territory Cards are always free) */
  cost?: string;
  /** What happens immediately when the card is taken */
  immediateEffect?: string;
  /** What happens for the rest of the game when the card is taken */
  permanentEffect?: string;
}
