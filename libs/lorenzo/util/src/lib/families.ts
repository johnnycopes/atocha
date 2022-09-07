import { Family } from './family.interface';

export const FAMILIES: readonly Family[] = [
  {
    name: 'Della Scala',
    privilege: `
      Whenever you take a Council Privilege, take any bonus except Faith Points
      and gain 1 Faith Point along with whatever you choose. Additionally, you may exchange
      1 Faith Point for 1 coin, 1 servant, and 1 Military Point any number of times.
    `,
  },
  {
    name: 'Visconti',
    privilege: `
      Before the Family Tiles auction, draw 2 Leader Cards and place them faceup next to this tile.
      If you take this Family Tile, take the 2 Leader Cards and the 5 Visconti tokens. Place all 5
      tokens in front of you on the non-active side. Whenever you play a Leader Card, activate a
      token of your choosing (flip it to the side with a ✔ symbol) and gain its bonus. You also gain
      the bonus of all tokens that you've already activated. NOTE: if you play more than 5 Leader Cards,
      activate all the tokens each time you play an additional Leader Card.
    `,
  },
];
