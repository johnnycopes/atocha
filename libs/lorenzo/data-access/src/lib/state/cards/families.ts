import { Family } from '@atocha/lorenzo/util';

export const FAMILIES: readonly Family[] = [
  {
    name: 'Aragonesi',
    privilege: `
      When taking a Territory Card, immediately perform a Harvest action at value -1
      the card taken. You may not increase this value in any way.
    `,
  },
  {
    name: 'Colonna',
    privilege: `
      Throughout the entire game, you control the brown Family Member with a value of 3. For placement
      rules, it's neutral (not considered colored or uncolored).
    `,
  },
  {
    name: 'Da Montefeltro',
    privilege: `
      When spending wood and/or stone to take a Building Card, place the spent resources
      on this tile. When taking a Council Privilege, you can choose to gain all the resources
      from this tile rather than one of the typical Council Privilege options.
    `,
  },
  {
    name: 'Della Rovere',
    privilege: `
      Place the Faith Tiles on the corresponding step of the Faith Track. When your Marker Disc reaches
      them, take the tile and gain the indicated bonus. When being excommunicated, lose 5 Victory Points.
    `,
  },
  {
    name: 'Della Scala',
    privilege: `
      When taking a Council Privilege, take any bonus except Faith Points
      and gain 1 Faith Point along with whatever you choose. Additionally, you may exchange
      1 Faith Point for 1 coin, 1 servant, and 1 Military Point any number of times.
    `,
  },
  {
    name: 'Este',
    privilege: `
      During your turn, you exchange 1 Military Point for 2 coins as many times as you like.
    `,
  },
  {
    name: 'Gonzaga',
    privilege: `
      At the end of the Actions phase of each round, you may exchange 7 servants for 1 Development Card
      left on the board (excluding the 5th tower) without paying its cost. If it's a Territory Card,
      ignore the Military Points requirement.
    `,
  },
  {
    name: 'Malatesta',
    privilege: `
      When taking a Venture Card that costs Military Points, you must have the Military Points, but
      you don't spend them.
    `,
  },
  {
    name: 'Medici',
    privilege: `
      When taking a Character Card, also gain 1 Special Token. Additionally, you may have up to 8
      Character Cards. Having 7 or 8 of them at the end of the game is worth 28 or 36 Victory Points (respectively).
    `,
  },
  {
    name: 'Orsini',
    privilege: `
      When completing a set of 4 different Development Cards (1 of each type), gain a reward. 1st time: draw 2 Leader
      Cards. 2nd time: play a Leader Card for free. 3rd time: gain 10 Victory Points. 4th time: gain 15 Victory Points.
    `,
  },
  {
    name: 'Sforza',
    privilege: `
      When taking a Character Card, also gain 1 Special Token. Additionally, you may have up to 8
      Character Cards. Having 7 or 8 of them at the end of the game is worth 28 or 36 Victory Points (respectively).
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
