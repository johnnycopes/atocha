import { Development } from "./development.interface";

export const DEVELOPMENTS: readonly Development[] = [
  {
    id: 1,
    period: 1,
    deck: 'territory',
    type: 'territory',
    permanentEffect: 'Harvest action of value 1 or more: gain 1 coin'
  },
  {
    id: 2,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 wood',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 wood'
  },
  {
    id: 3,
    period: 1,
    deck: 'territory',
    type: 'territory',
    permanentEffect: 'Harvest action of value 3 or more: gain 1 coin and 1 servant'
  },
  {
    id: 4,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 stone',
    permanentEffect: 'Harvest action of value 4 or more: lose 2 Victory Points'
  },
  {
    id: 5,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 wood',
    permanentEffect: 'Harvest action of value 5 or more: gain 3 wood'
  },
  {
    id: 6,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 Military Points and 1 servant',
    permanentEffect: 'Harvest action of value 5 or more: gain 1 Faith Point and 1 stone'
  },
  {
    id: 7,
    period: 1,
    deck: 'territory',
    type: 'territory',
    permanentEffect: 'Harvest action of value 5 or more: gain 2 Military Points and 1 stone'
  },
  {
    id: 8,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 3 coins',
    permanentEffect: 'Harvest action of value 6 or more: take 1 Council Privilege'
  },
  {
    id: 9,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 coin',
    permanentEffect: 'Harvest action of value 1 or more: gain 2 coins'
  },
  {
    id: 10,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 servant',
    permanentEffect: 'Harvest action of value 3 or more: gain 1 Military Point and 2 wood'
  },
  {
    id: 11,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 servants and 1 stone',
    permanentEffect: 'Harvest action of value 4 or more: gain 1 servant and 2 stone'
  },
  {
    id: 12,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 wood',
    permanentEffect: 'Harvest action of value 3 or more: gain 3 stone'
  },
  {
    id: 13,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 servants and 1 wood',
    permanentEffect: 'Harvest action of value 4 or more: gain 1 coin and 2 wood'
  },
  {
    id: 14,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 Faith Point',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 Faith Point'
  },
  {
    id: 15,
    period: 2,
    deck: 'territory',
    type: 'territory',
    permanentEffect: 'Harvest action of value 5 or more: gain 2 Military Points and 2 servants'
  },
  {
    id: 16,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 4 coins',
    permanentEffect: 'Harvest action of value 6 or more: gain 1 coin, 1 stone, and 2 wood'
  },
  {
    id: 17,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 coin and 1 servant',
    permanentEffect: 'Harvest action of value 1 or more: gain 3 coins'
  },
  {
    id: 18,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 Victory Point and 1 wood',
    permanentEffect: 'Harvest action of value 3 or more: gain 2 Victory Points and 2 wood'
  },
  {
    id: 19,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 Military Points',
    permanentEffect: 'Harvest action of value 5 or more: gain 4 Victory Points and 1 wood'
  },
  {
    id: 20,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 Victory Point and 2 stone'
  },
  {
    id: 21,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Take 1 Council Privilege and gain 1 stone',
    permanentEffect: 'Harvest action of value 6 or more: gain 4 Victory Points and 1 stone'
  },
  {
    id: 22,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 Faith Point',
    permanentEffect: 'Harvest action of value 1 or more: gain 1 coin and 1 Faith Point'
  },
  {
    id: 23,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 Victory Points and 2 coins',
    permanentEffect: 'Harvest action of value 4 or more: gain 3 Military Points and 1 servant'
  },
  {
    id: 24,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 Military Points and 1 servant',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 Military Point and 2 servants'
  },
  {
    id: 25,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 wood and 3 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 5 or more: gain 1 coin times your number of Building Cards'
  },
  {
    id: 26,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '3 wood and 1 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 5 or more: gain 1 coin times your number of Territory Cards'
  },
  {
    id: 27,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '2 coins and 2 stone',
    immediateEffect: 'Gain 6 Victory Points',
    permanentEffect: 'Production action of value 6 or more: gain 1 Victory Point times your number of Venture Cards'
  },
  {
    id: 28,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '2 coins and 2 wood',
    immediateEffect: 'Gain 6 Victory Points',
    permanentEffect: 'Production action of value 6 or more: gain 1 Victory Point times your number of Character Cards'
  },
  {
    id: 29,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 coin and 2 wood',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Production action of value 4 or more: exchange 1 wood for 3 coins OR 2 wood for 5 coins'
  },
  {
    id: 30,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 coin and 2 stone',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value 3 or more: exchange 1 stone for 3 coins OR 2 stone for 5 coins'
  },
  {
    id: 31,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '2 wood',
    immediateEffect: 'Gain 1 Faith Point',
    permanentEffect: 'Production action of value 2 or more: exchange 1 coin for 1 Faith Point'
  },
  {
    id: 32,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '2 stone',
    immediateEffect: 'Gain 1 Victory Point',
    permanentEffect: 'Production action of value 1 or more: exchange 1 coin for 1 Council Privilege'
  },
  {
    id: 33,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '2 wood and 1 stone',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Production action of value 3 or more: exchange 3 coins for 2 wood and 2 stone'
  },
  {
    id: 34,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '3 wood',
    immediateEffect: 'Gain 4 Victory Points',
    permanentEffect: 'Production action of value 3 or more: exchange 1 coin for 3 Victory Points OR 2 coins for 5 Victory Points'
  },
  {
    id: 35,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '4 wood',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 4 or more: exchange 1 wood for 3 Victory Points OR 3 wood for 7 Victory Points',
  },
  {
    id: 36,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '4 stone',
    immediateEffect: 'Gain 6 Victory Points',
    permanentEffect: 'Production action of value 5 or more: exchange 1 stone for 3 Victory Points OR 3 stone for 7 Victory Points'
  },
  {
    id: 37,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '1 wood and 2 stone',
    immediateEffect: 'Gain 4 Victory Points',
    permanentEffect: 'Production action of value 4 or more: exchange 1 servant, 1 wood, and 1 stone for 6 Victory Points'
  },
  {
    id: 38,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '3 stone',
    immediateEffect: 'Gain 2 Victory Points and 1 Faith Point',
    permanentEffect: 'Production action of value 2 or more: exchange 1 Faith Point for 2 coins and 2 Victory Points'
  },
  {
    id: 39,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '1 wood and 1 stone',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Production action of value 1 or more: exchange 1 servant for 3 Military Points'
  },
  {
    id: 40,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '2 coins, 2 wood, and 2 stone',
    immediateEffect: 'Gain 8 Victory Points',
    permanentEffect: 'Production action of value 6 or more: gain 2 Military Points and 2 Victory Points'
  },
  {
    id: 41,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '3 coins, 1 wood, and 3 stone',
    immediateEffect: 'Gain 7 Victory Points',
    permanentEffect: 'Production action of value 2 or more: gain 5 coins'
  },
  {
    id: 42,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '4 coins and 3 wood',
    immediateEffect: 'Gain 8 Victory Points',
    permanentEffect: 'Production action of value 4 or more: exchange 4 coins for 3 wood and 3 stone'
  },
  {
    id: 43,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '2 servants, 4 wood, and 2 stone',
    immediateEffect: 'Gain 10 Victory Points',
    permanentEffect: 'Production action of value 1 or more: gain 3 Victory Points'
  },
  {
    id: 44,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '2 coins, 2 wood, and 4 stone',
    immediateEffect: 'Gain 9 Victory Points',
    permanentEffect: 'Production action of value 5 or more: gain 2 Victory Points and 1 Council Privilege'
  },
  {
    id: 45,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '3 coins, 3 wood, and 1 stone',
    immediateEffect: 'Gain 9 Victory Points',
    permanentEffect: 'Production action of value 6 or more: exchange 1 coin for 2 servants and 4 Victory Points'
  },
  {
    id: 46,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '1 wood and 4 stone',
    immediateEffect: 'Gain 5 Victory Points and 1 Faith Point',
    permanentEffect: 'Production action of value 1 or more: exchange 1 wood OR 1 stone for 2 Faith Points'
  },
  {
    id: 47,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '1 servant, 2 wood, and 2 stone',
    immediateEffect: 'Gain 7 Victory Points',
    permanentEffect: 'Production action of value 3 or more: exchange 1 servant for 3 Military Points and 1 Victory Point'
  },
  {
    id: 48,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '4 wood and 4 stone',
    immediateEffect: 'Gain 7 Victory Points and 3 Faith Points',
    permanentEffect: 'Production action of value 2 or more: gain 1 Victory Point'
  },
  {
    id: 49,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Gain 3 Military Points',
    permanentEffect: 'When buying a Territory Card, increase the value by 2'
  },
  {
    id: 50,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    permanentEffect: 'When buying a Building Card, increase the value by 2 and decrease the cost by 1 wood OR 1 stone'
  },
  {
    id: 51,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    permanentEffect: 'When buying a Character Card, increase the value by 2 and decrease the cost by 1 coin'
  },
  {
    id: 52,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Take 1 Council Privilege',
    permanentEffect: 'When buying a Venture Card, increase the value by 2'
  },
  {
    id: 53,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    permanentEffect: 'Increase Harvest action value by 2'
  },
  {
    id: 54,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    permanentEffect: 'Increase Production action value by 2'
  },
  {
    id: 55,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Gain 4 Faith Points',
    permanentEffect: 'No bonus when buying a card from the 3rd and 4th floors of the towers'
  },
  {
    id: 56,
    period: 1 ,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Buy any type of card up to value 4 and gain 1 Faith Point',
  },
  {
    id: 57,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    immediateEffect: 'Buy a Territory Card up to value 6 and gain 2 Military Points',
  },
  {
    id: 58,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    immediateEffect: 'Buy a Building Card up to value 6 with a discount of 1 wood/stone',
  },
  {
    id: 59,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Buy a Character Card up to value 6 with a discount of 2 coins',
  },
  {
    id: 60,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    immediateEffect: 'Buy a Venture Card up to value 6 and take 1 Council Privilege',
  },
  {
    id: 61,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    permanentEffect: 'Increase Harvest action value by 3'
  },
  {
    id: 62,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    permanentEffect: 'Increase Production action value by 3'
  },
  {
    id: 63,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: '3 Faith Points',
  },
  {
    id: 64,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Take 3 unique Council Privileges',
  },
  {
    id: 65,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Gain 2 Victory Points times your number of Territory Cards',
  },
  {
    id: 66,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Gain 2 Victory Points times your number of Building Cards',
  },
  {
    id: 67,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Gain 2 Victory Points times your number of Character Cards',
  },
  {
    id: 68,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Gain 2 Victory Points times your number of Venture Cards',
  },
  {
    id: 69,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    immediateEffect: 'Perform a Harvest action at value 4 and gain 2 Faith Points',
  },
  {
    id: 70,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Perform a Production action at value 4 and gain 1 Faith Point',
  },
  {
    id: 71,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Gain 1 Victory Point times every 2 of your Military Points',
  },
  {
    id: 72,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Buy any type of card up to value 7 and take 1 Council Privilege',
  },
  {
    id: 73,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '4 coins',
    immediateEffect: 'Gain 5 Military Points',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    id: 74,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '1 coin, 1 wood, and 1 stone',
    immediateEffect: 'Gain 1 Faith Point',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    id: 75,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '3 stone',
    immediateEffect: 'Gain 2 Military Points and 1 Council Privilege',
    permanentEffect: 'End of game: gain 3 Victory Points'
  },
  {
    id: 76,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '2 wood and 2 stone',
    immediateEffect: 'Take 2 unique Council Privileges',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    id: 77,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '2 Military Points (you must have at least 3)',
    immediateEffect: 'Gain 3 coins',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    id: 78,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '3 wood',
    immediateEffect: 'Gain 4 servants',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    id: 79,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '3 Military Points (you must have at least 5)',
    immediateEffect: 'Gain 2 Faith Points',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    id: 80,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '2 Military Points (you must have at least 2)',
    immediateEffect: 'Gain 3 Faith Points',
    permanentEffect: 'End of game: gain 1 Victory Point'
  },
  {
    id: 81,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '6 coins',
    immediateEffect: 'Gain 6 Military Points',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    id: 82,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '2 coins, 2 wood, and 2 stone',
    immediateEffect: 'Gain 2 Faith Points',
    permanentEffect: 'End of game: gain 6 Victory Points'
  },
  {
    id: 83,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '4 stone',
    immediateEffect: 'Gain 3 Military Points and take 1 Council Privilege',
    permanentEffect: 'End of game: gain 2 Victory Points'
  },
  {
    id: 84,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '3 Military Points (you must have at least 6)',
    immediateEffect: 'Gain 5 coins and take 1 Council Privilege',
    permanentEffect: 'End of game: gain 3 Victory Points'
  },
  {
    id: 85,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '2 servants and 3 coins',
    immediateEffect: 'Perform a Harvest action at value 4',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    id: 86,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '4 wood',
    immediateEffect: 'Gain 5 servants',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    id: 87,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '4 Military Points (you must have at least 8)',
    immediateEffect: 'Gain 5 coins and 1 Faith Point',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    id: 88,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '4 Military Points (you must have at least 7)',
    immediateEffect: 'Gain 3 Faith Points',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    id: 89,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '8 coins',
    immediateEffect: 'Gain 7 Military Points',
    permanentEffect: 'End of game: gain 6 Victory Points'
  },
  {
    id: 90,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '3 coins, 3 wood, and 3 stone',
    immediateEffect: 'Buy any type of card up to value 7 and gain 1 Faith Point',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    id: 91,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '6 stone',
    immediateEffect: 'Gain 4 Military Points and take 1 Council Privilege',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    id: 92,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '6 wood',
    immediateEffect: 'Gain 3 Faith Points',
    permanentEffect: 'End of game: gain 3 Victory Points'
  },
  {
    id: 93,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '6 Military Points (you must have at least 12)',
    immediateEffect: '3 wood, 3 stone, and 3 coins',
    permanentEffect: 'End of game: gain 7 Victory Points'
  },
  {
    id: 94,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '3 servants and 4 coins',
    immediateEffect: 'Perform a Production action at value 3',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    id: 95,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '8 Military Points (you must have at least 15)',
    immediateEffect: 'Gain 4 Faith Points',
    permanentEffect: 'End of game: gain 8 Victory Points'
  },
  {
    id: 96,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '5 Military Points (you must have at least 10) OR 3 wood, 3 stone, and 4 coins',
    immediateEffect: 'Gain 2 Faith Points',
    permanentEffect: 'End of game: gain 10 Victory Points'
  },
  {
    id: 97,
    period: 1,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 Special Token'
  },
  {
    id: 98,
    period: 1,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 1 Special Token',
    permanentEffect: 'Place 1 of your Special Tokens faceup here. On a Harvest action of value 2 or more, gain/perform whatever is shown on the Special Token'
  },
  {
    id: 99,
    period: 1,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value N: gain 1 wood times your number of Venture Cards (max N times)'
  },
  {
    id: 100,
    period: 1,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value N: gain 1 stone times your number of Character Cards (max N times)'
  },
  {
    id: 101,
    period: 2,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value 5 or more: gain 2 Faith Points'
  },
  {
    id: 102,
    period: 2,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 1 servant, 1 stone, 1 wood, and 1 coin',
    permanentEffect: 'Harvest action of value 3 or more: gain 2 Victory Points'
  },
  {
    id: 103,
    period: 2,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value 7 or more: gain 5 Victory Points'
  },
  {
    id: 104,
    period: 2,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Lose 3 Victory Points',
    permanentEffect: 'Harvest action of value 1 or more: gain 1 stone, 1 wood, 1 coin, and 1 servant'
  },
  {
    id: 105,
    period: 3,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 2 Special Tokens',
    permanentEffect: 'Harvest action of value 6 or more: gain 1 Faith Point, 2 Victory Points, and 2 coins'
  },
  {
    id: 106,
    period: 3,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 2 wood, 2 stone, and 2 coins',
    permanentEffect: 'Harvest action of value 5 or more: gain 3 Victory Points'
  },
  {
    id: 107,
    period: 3,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 2 Faith Points',
    permanentEffect: 'Harvest action of value N: gain 1 Victory Point times your number of Building Cards (max N times)'
  },
  {
    id: 108,
    period: 3,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Harvest action of value 7 or more: gain 2 wood, 2 stone, and 2 coins'
  },
  {
    id: 109,
    period: 1,
    deck: 'special',
    type: 'building',
    cost: 'Gain 1 wood and 1 stone',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value 1 or more: exchange 1 coin for 1 Special Token'
  },
  {
    id: 110,
    period: 1,
    deck: 'special',
    type: 'building',
    cost: '2 coins and 2 wood',
    immediateEffect: 'Gain 4 Victory Points',
    permanentEffect: 'Production action of value 5 or more: Gain 1 Special Token OR exchange 3 Special Tokens to play a Leader Card for free'
  },
  {
    id: 111,
    period: 1,
    deck: 'special',
    type: 'building',
    cost: '1 coin and 2 stone',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value N: exchange 1 stone for 1 coin and 1 Victory Point up to N times'
  },
  {
    id: 112,
    period: 1,
    deck: 'special',
    type: 'building',
    cost: '2 wood',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value N: exchange 1 wood for 1 coin and 1 Victory Point up to N times'
  },
  {
    id: 113,
    period: 2,
    deck: 'special',
    type: 'building',
    cost: '1 servant, 2 wood, and 2 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 3 or more: activate 1 of your Building Cards, ignoring its value'
  },
  {
    id: 114,
    period: 2,
    deck: 'special',
    type: 'building',
    cost: '2 servants, 1 coin, and 1 stone',
    immediateEffect: 'Gain 4 Victory Points and 1 Faith Point',
    permanentEffect: 'Production action of value 5 or more: activate 1 of your Building or Territory Cards, ignoring its value'
  },
  {
    id: 115,
    period: 2,
    deck: 'special',
    type: 'building',
    cost: '3 wood and 2 stone',
    immediateEffect: 'Gain 6 Victory Points and 1 Special Token',
    permanentEffect: 'Production action of value 4 or more: exchange 1 Special Token for 5 Victory Points'
  },
  {
    id: 116,
    period: 2,
    deck: 'special',
    type: 'building',
    cost: '5 wood',
    immediateEffect: 'Gain 7 Victory Points',
    permanentEffect: 'Production action of value 7 or more: exchange 1 wood and 1 stone for 3 Faith Points'
  },
  {
    id: 117,
    period: 3,
    deck: 'special',
    type: 'building',
    cost: '2 coins, 1 wood, and 4 stone',
    immediateEffect: 'Gain 7 Victory Points',
    permanentEffect: 'Production action of value 6 or more: 2 Victory Points times your number of played Leader Cards'
  },
  {
    id: 118,
    period: 3,
    deck: 'special',
    type: 'building',
    cost: '1 servant, 4 wood, and 3 stone',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value 7 or more: gain 7 Victory Points'
  },
  {
    id: 119,
    period: 3,
    deck: 'special',
    type: 'building',
    cost: '3 coins, 4 wood, and 3 stone',
    immediateEffect: 'Gain 15 Victory Points',
    permanentEffect: 'Production action of value 1 or more: lose 3 Victory Points'
  },
  {
    id: 120,
    period: 3,
    deck: 'special',
    type: 'building',
    cost: '2 servants, 3 wood, and 3 stone',
    immediateEffect: 'Gain 8 Victory Points',
    permanentEffect: 'Production action of value 5 or more: gain 3 Faith Points'
  },
  {
    id: 121,
    period: 1,
    deck: 'special',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Gain 1 Leader Card and 1 Faith Point',
  },
  {
    id: 122,
    period: 1,
    deck: 'special',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Gain 2 Leader Cards',
  },
  {
    id: 123,
    period: 1,
    deck: 'special',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Gain 1 Special Token',
    permanentEffect: 'Increase both Production action and Harvest action values by 1'
  },
  {
    id: 124,
    period: 1,
    deck: 'special',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Gain 1 Special Token',
    permanentEffect: 'When playing a Leader Card, gain a Special Token'
  },
  {
    id: 125,
    period: 2,
    deck: 'special',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Play a Leader Card for free',
  },
  {
    id: 126,
    period: 2,
    deck: 'special',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Gain 1 Special Token',
    permanentEffect: 'Ignore the 3 coin occupied tower penalty when entering the Special Tower'
  },
  {
    id: 127,
    period: 2,
    deck: 'special',
    type: 'character',
    cost: '6 coins and 1 Special Token',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'When playing a Leader Card, ignore 1 of its requirements'
  },
  {
    id: 128,
    period: 2,
    deck: 'special',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Gain 2 Special Tokens',
    permanentEffect: 'Place 1 of your Special Tokens faceup here. When occupying a Market action space, gain/perform whatever is shown on the Special Token'
  },
  {
    id: 129,
    period: 3,
    deck: 'special',
    type: 'character',
    cost: '6 coins',
    immediateEffect: '3 Victory Points times your number of played Leader Cards',
  },
  {
    id: 130,
    period: 3,
    deck: 'special',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Take a discarded card of any type (except Special Development) for free',
  },
  {
    id: 131,
    period: 3,
    deck: 'special',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Gain 1 Victory Point times your number of Faith Points',
  },
  {
    id: 132,
    period: 3,
    deck: 'special',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Take a discarded Venture Card (not from the Special Development deck) for free',
  },
  {
    id: 133,
    period: 1,
    deck: 'special',
    type: 'venture',
    cost: '2 coins and 2 stone',
    immediateEffect: 'Gain 2 Special Tokens',
    permanentEffect: 'End of game: gain 2 Victory Points times your number of Special Tokens (max 12 points)'
  },
  {
    id: 134,
    period: 1,
    deck: 'special',
    type: 'venture',
    cost: '2 Military Points (you must have at least 2)',
    immediateEffect: 'Gain 2 wood and 2 stone',
    permanentEffect: 'End of game: gain 2 Victory Points times each 1 wood and 1 stone you have (max 12 points)'
  },
  {
    id: 135,
    period: 1,
    deck: 'special',
    type: 'venture',
    cost: '2 wood and 1 stone',
    immediateEffect: 'Gain 3 servants',
    permanentEffect: 'End of game: gain 1 Victory Point times your number of servants (max 12 points)'
  },
  {
    id: 136,
    period: 1,
    deck: 'special',
    type: 'venture',
    cost: '1 coin and 3 wood',
    immediateEffect: "If you aren't currently ranked first on the Military Track, move your marker to the same position as the highest marker",
    permanentEffect: 'End of game: gain 5 victory points'
  },
  {
    id: 137,
    period: 2,
    deck: 'special',
    type: 'venture',
    cost: '2 coins, 1 wood, and 3 stone',
    immediateEffect: 'Gain 2 Military Points',
    permanentEffect: 'End of game: gain 1 Victory Point times every 2 of your Military Points'
  },
  {
    id: 138,
    period: 2,
    deck: 'special',
    type: 'venture',
    cost: '5 Military Points (you must have at least 7), 2 wood, 1 stone, and 1 servant',
    immediateEffect: 'Gain 5 Faith Points and 1 Special Token',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    id: 139,
    period: 2,
    deck: 'special',
    type: 'venture',
    cost: '5 Military Points (you must have at least 5) OR 2 wood, 1 coin, and 1 Faith Point',
    immediateEffect: 'Gain 3 Special Tokens',
    permanentEffect: 'End of game: gain 3 Victory Points'
  },
  {
    id: 140,
    period: 2,
    deck: 'special',
    type: 'venture',
    cost: '5 coins',
    immediateEffect: 'Activate 2 of your Territory Cards, ignoring their values',
    permanentEffect: 'End of game: gain 6 Victory Points',
  },
  {
    id: 141,
    period: 3,
    deck: 'special',
    type: 'venture',
    cost: '10 coins OR 5 Special Tokens',
    immediateEffect: 'Gain 2 Military Points',
    permanentEffect: 'End of game: gain 15 Victory Points'
  },
  {
    id: 142,
    period: 3,
    deck: 'special',
    type: 'venture',
    cost: '8 wood and 8 stone',
    immediateEffect: 'Gain 3 Special Tokens',
    permanentEffect: 'End of game: gain 12 Victory Points'
  },
  {
    id: 143,
    period: 3,
    deck: 'special',
    type: 'venture',
    cost: '6 Military Points (you must have at least 12) and 6 coins',
    immediateEffect: 'Gain 4 Faith Points',
    permanentEffect: 'End of game: gain 10 Victory Points'
  },
  {
    id: 144,
    period: 3,
    deck: 'special',
    type: 'venture',
    cost: '7 Military Points (you must have at least 14) and 5 servants',
    immediateEffect: 'Activate 2 of your Building Cards, ignoring their values',
    permanentEffect: 'End of game: gain 12 Victory Points'
  },
  {
    id: 145,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 5 coins',
    permanentEffect: 'Harvest action of value 3 or more: lose 1 Victory Point'
  },
  {
    id: 146,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 3 wood and 3 stone',
    permanentEffect: 'Harvest action of value 4 or more: lose 2 Victory Points'
  },
  {
    id: 147,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 wood and 1 servant',
    permanentEffect: 'Harvest action of value 5 or more: gain 3 wood OR 3 servants'
  },
  {
    id: 148,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 Military Point and 1 Faith Point',
    permanentEffect: 'Harvest action of value 4 or more: gain 2 Military Points OR 1 Faith Point'
  },
  {
    id: 149,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 wood and 2 stone',
    permanentEffect: 'Harvest action of value 4 or more: gain 3 stone OR 3 wood'
  },
  {
    id: 150,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 coins and 2 servants',
    permanentEffect: 'Harvest action of value 5 or more: gain 1 Victory Point and 3 Faith Points'
  },
  {
    id: 151,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Gain 1 stone',
    permanentEffect: 'Ignore the -3 penalty when occupying the large Production action space'
  },
  {
    id: 152,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Gain 1 wood',
    permanentEffect: 'Ignore the -3 penalty when occupying the large Harvest action space'
  },
  {
    id: 153,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Perform a Production action at value 3 using the Building Cards belonging to another player of your choosing (spending your own resources)',
    permanentEffect: 'Increase Production action value by 1'
  },
  {
    id: 154,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Perform a Harvest action at value 2 using the Territory Cards belonging to another player of your choosing (spending your own resources)',
    permanentEffect: 'Increase Harvest action value by 1'
  },
  {
    id: 155,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Gain 3 Victory Points and each of your opponents must discard 1 Building Card OR 1 Territory Card (they choose)',
  },
  {
    id: 156,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Take 2 Council Privileges and each of your opponents must discard 1 Character Card OR 1 Venture Card (they choose)',
  },
  {
    id: 157,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 coin, 1 wood, and 1 stone',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Production action of value 2 or more: exchange 1 Victory Point for 1 Council Privilege'
  },
  {
    id: 158,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 servant, 1 coin, and 2 wood',
    immediateEffect: 'Take 2 Council Privileges',
    permanentEffect: 'Production action of value 6 or more: lose 1 Victory Point times your number of opponents and each opponent must give you 2 coins OR 3 Victory Points (they choose)'
  },
  {
    id: 159,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '2 coins and 2 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 5 ore more: discard 1 of your Character Cards to gain 7 Victory Points'
  },
  {
    id: 160,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '1 servant and 2 wood',
    immediateEffect: 'Gain 2 Military Points',
    permanentEffect: 'Production action of value 4 or more: lose 1 Military Point times your number of opponents and each opponent must give you 2 servants OR 3 Victory Points (they choose)'
  },
  {
    id: 161,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '2 coins, 1 wood, and 2 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 2 or more: gain the reward of an empty Market action space OR take 1 Council Privilege'
  },
  {
    id: 162,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '2 coins, 4 wood, and 1 Faith Point',
    immediateEffect: 'Gain 8 Victory Points',
    permanentEffect: 'Production action of value 4 or more: discard 1 played Leader Card and gain 6 Victory Points'
  },
  {
    id: 163,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '1 Military Point times your number of opponents',
    immediateEffect: 'Each of your opponents must give you 1 wood OR 1 stone OR 1 coin OR 1 servant (they choose)',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    id: 164,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '3 coins and 2 servants',
    immediateEffect: 'Draw 2 Leader Cards',
    permanentEffect: 'End of game: gain 2 Victory Points times your played Leader Cards'
  },
  {
    id: 165,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '2 Military Points times your number of opponents',
    immediateEffect: 'Each of your opponents must give you 2 wood OR 2 stone OR 2 coins OR 2 servants (they choose)',
    permanentEffect: 'End of game: gain 6 Victory Points'
  },
  {
    id: 166,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '5 wood',
    immediateEffect: 'Gain 3 coins',
    permanentEffect: 'End of game: gain 2 Victory Points times your number of Building Cards'
  },
  {
    id: 167,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '3 Military Points times your number of opponents',
    immediateEffect: 'Each of your opponents must give you 3 wood OR 3 stone OR 3 coins OR 3 servants (they choose)',
    permanentEffect: 'End of game: gain 8 Victory Points'
  },
  {
    id: 168,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '7 wood OR 7 stone',
    immediateEffect: 'Buy any type of card up to value 7',
    permanentEffect: 'End of game: gain 7 Victory Points'
  }
];
