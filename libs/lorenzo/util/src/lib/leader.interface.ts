export interface Leader {
  /** The leader's name, printed at the top of the card */
  name: string;
  /** What must be possessed (not spent) to play the card */
  requirement: string;
  /** What happens when the card is played */
  ability: string;
  /** The card's ability type */
  type: LeaderType;
}

export type LeaderType = 'permanent' | 'once per round' | 'action' | 'immediate';
