import { Leader } from './leader.interface';

export const LEADERS: readonly Leader[] = [
  {
    name: "Alfonso V d'Aragona",
    requirement: '6 Military Points and 0 Faith Points',
    ability: 'Each time you take a Territory Card, gain 1 Faith Point',
    type: 'permanent',
  },
  {
    name: "Alfonso I d'Este",
    requirement: '10 coins and max 1 servant',
    ability: 'Each time you take a Character Card, gain 2 servants',
    type: 'permanent',
  },
  {
    name: 'Bartolomeo Colleoni',
    requirement: '2 Venture Cards and 4 Territory Cards',
    ability: 'Gain 4 Victory Points',
    type: 'once per round',
  },
  {
    name: "Beatrice d'Este",
    requirement: '5 Development Cards with max 1 Character Card and max 1 coin',
    ability: 'Discard 1 Special Token to gain 5 Victory Points OR 5 coins',
    type: 'once per round',
  },
  {
    name: 'Bramante',
    requirement: '4 Venture Cards, 4 servants, 4 wood, and 4 coins',
    ability:
      'When you place one of your Family Members here, perform a Harvest action OR a Production action at the value of the placed Family Member. You can increase this action value',
    type: 'action',
  },
  {
    name: 'Carlo VIII',
    requirement: '6 servants, 5 Military Points, and 5 Faith Points',
    ability: 'Spend 1 servant to increase the value of an action by 2',
    type: 'permanent',
  },
  {
    name: 'Cesare Borgia',
    requirement: '3 Building Cards, 12 coins, and 2 Faith Points',
    ability:
      'You may waive the Military Points requirement when you take Territory Cards',
    type: 'permanent',
  },
  {
    name: "Cosimo de' Medici",
    requirement: '2 Character Cards and 4 Building Cards',
    ability: 'Gain 3 servants and 1 Victory Point',
    type: 'once per round',
  },
  {
    name: 'Erasmo da Rotterdam',
    requirement: '4 Venture Cards and 3 Character Cards',
    ability:
      'When you place one of your Family Members here, gain 3 wood, 3 stone, and 3 Victory Points',
    type: 'action',
  },
  {
    name: "Ercole I d'Este",
    requirement: '4 Faith Points, max 1 Military Point, and max 1 coin',
    ability: 'Each time you take a Building Card, gain 2 Military Points',
    type: 'permanent',
  },
  {
    name: 'Federico da Montefeltro',
    requirement: '5 Territory Cards',
    ability:
      'One of your colored Family Members has value 6, regardless of its related die',
    type: 'once per round',
  },
  {
    name: "Ferdinando d'Aragona",
    requirement: '8 coins, 8 servants, and max 1 combined wood and stone',
    ability: 'Each time you take a Venture Card, gain 1 wood and 1 stone',
    type: 'permanent',
  },
  {
    name: 'Filippo Brunelleschi',
    requirement: '5 Building Cards',
    ability:
      "You don't have to spend 3 coins when you place your Family Members in an already occupied tower",
    type: 'permanent',
  },
  {
    name: 'Francesco Sforza',
    requirement: '5 Venture Cards',
    ability: 'Perform a Harvest action at value 1. You may increase this value',
    type: 'once per round',
  },
  {
    name: 'Giovanni dalle Bande Nere',
    requirement: '12 Military Points',
    ability: 'Gain 1 wood, 1 coin, and 1 stone',
    type: 'once per round',
  },
  {
    name: 'Girolamo Savonarola',
    requirement: '18 coins',
    ability: 'Gain 1 Faith Point',
    type: 'once per round',
  },
  {
    name: 'Giulio II',
    requirement: '9 Development Cards of max 3 different types',
    ability: 'Discard 1 wood, 1 stone, and 1 coin to gain 3 Faith Points',
    type: 'once per round',
  },
  {
    name: "Guglielmo de' Pazzi",
    requirement: '4 Character Cards and 8 coins',
    ability:
      'When you place one of your Family Members here, gain 2 Military Points and 3 Faith Points',
    type: 'action',
  },
  {
    name: 'Jacopo Salivate',
    requirement: '3 Building Cards and 8 Military Points',
    ability:
      'Whenever you take 1 or more Council Privileges, take 1 additional Council Privilege of any type',
    type: 'permanent',
  },
  {
    name: 'Ladislao VII Jagellone',
    requirement: '10 Victory Points and max 1 Building Card',
    ability: 'You can play a Leader Card regardless of its requirements',
    type: 'immediate',
  },
  {
    name: 'Leon Battista Alberti',
    requirement: '3 Venture Cards and 10 servants',
    ability: 'Perform a Production action at value 3 on 1 Building Card',
    type: 'once per round',
  },
  {
    name: 'Leonardo da Vinci',
    requirement: '4 Character Cards and 2 Territory Cards',
    ability:
      'Perform a Production action at value 0. You may increase this value',
    type: 'once per round',
  },
  {
    name: "Lorenzo de' Medici",
    requirement: '35 Victory Points',
    ability:
      "Copy the ability of another Leader Card already played by another player. Once you've decided which ability to copy, it cannot be changed",
    type: 'permanent',
  },
  {
    name: 'Lucia da Narni',
    requirement:
      '6 Development Cards, max 1 Territory Card, and max 2 Special Tokens',
    ability: 'Gain 1 Faith Point and 2 Victory Points',
    type: 'once per round',
  },
  {
    name: 'Lucrezia Borgia',
    requirement: '6 Development Cards of the same type',
    ability:
      'Your colored Family Members have a bonus of +2 on their value. You may increase this value',
    type: 'permanent',
  },
  {
    name: 'Ludovico Ariostso',
    requirement: '5 Character Cards',
    ability: 'You can place your Family Members in occupied action spaces',
    type: 'permanent',
  },
  {
    name: 'Ludovico III Gonzaga',
    requirement: '15 servants',
    ability: 'Take 1 Council Privilege',
    type: 'once per round',
  },
  {
    name: 'Ludovico il Moro',
    requirement:
      '2 Territory Cards, 2 Character Cards, 2 Building Cards, and 2 Venture Cards',
    ability:
      'Your colored Family Members have a value of 5, regardless of their related dice. You may increase this value',
    type: 'permanent',
  },
  {
    name: 'Marsilio Ficino',
    requirement: '4 Faith Points, 5 stone, and a max of 1 Venture Card',
    ability: 'Draw 2 Special Tokens. Choose 1 to keep and discard the other',
    type: 'once per round',
  },
  {
    name: 'Martin Lutero',
    requirement:
      '7 Military Points, 1 Territory Card, 1 Character Card, 1 Building Card, and 1 Venture Card',
    ability: 'You cannot be excommunicated',
    type: 'permanent',
  },
  {
    name: "Massimilano I d'Asburgo",
    requirement: '4 Territory Cards and 4 Building Cards',
    ability:
      'When you place one of your Family Members here, gain 3 Special Tokens and 5 Victory Points',
    type: 'action',
  },
  {
    name: 'Michelangelo Buonarroti',
    requirement: '10 stone',
    ability: 'Gain 3 coins',
    type: 'once per round',
  },
  {
    name: 'Niccoló Machiavelli',
    requirement: '3 Territory Cards, 20 Victory Points, and 1 Leader',
    ability:
      'Whenever you gain Victory Points, gain 1 additional Victory Point',
    type: 'permanent',
  },
  {
    name: 'Palla Strozzi',
    requirement: '4 Territory Cards and 5 Faith Points',
    ability: 'Perform a Harvest action at value 3 on 1 Territory Card',
    type: 'once per round',
  },
  {
    name: 'Paracelso',
    requirement: '3 Territory Cards and 3 stone',
    ability: 'You can spend servants instead of wood, stone, or coins',
    type: 'permanent',
  },
  {
    name: 'Pico della Mirandola',
    requirement: '4 Venture Cards and 2 Building Cards',
    ability:
      'When you take Development Cards, you get a discount of 3 coins for the Cards, but not for the occupied tower cost',
    type: 'permanent',
  },
  {
    name: 'Piero della Francesca',
    requirement: '4 Special Tokens and 10 Victory Points',
    ability:
      'When you place one of your Family Members here, gain 3 Special Tokens',
    type: 'action',
  },
  {
    name: 'Pietro Bembo',
    requirement: '3 Character Cards and 3 Faith Points',
    ability:
      'When you place one of your Family Members here, gain 3 coins and 3 servants',
    type: 'action',
  },
  {
    name: 'Raffaello Sanzio',
    requirement: '3 Character Cards, 6 wood, and 4 servants',
    ability:
      'You may lose 1 Victory Point to gain 3 coins OR discard 1 coin to gain 3 Victory Points',
    type: 'once per round',
  },
  {
    name: 'Sandro Botticelli',
    requirement: '10 wood',
    ability: 'Gain 2 Military Points and 1 Victory Point',
    type: 'once per round',
  },
  {
    name: 'Santa Rita',
    requirement: '8 Faith Points',
    ability:
      'Each time you gain wood, stone, coin, or servants as an immediate effect from Development Cards (not from an action space), you gain the resources twice',
    type: 'permanent',
  },
  {
    name: 'Sigismondo Malatesta',
    requirement: '7 Military Points and 3 Faith Points',
    ability:
      'Your uncolored Family Member has a bonus of +3 on its value. You may increase this value',
    type: 'permanent',
  },
  {
    name: 'Sisto IV',
    requirement: '6 stone, 6 wood, 6 servants, and 6 coins',
    ability:
      'Gain 5 additional Victory Points when you support the Church in a Vatican Report',
    type: 'permanent',
  },
  {
    name: 'Tomas de Torquemada',
    requirement: '3 Building Cards and 5 wood',
    ability: 'Discard a Character Card to gain 3 Faith Points',
    type: 'once per round',
  },
];
