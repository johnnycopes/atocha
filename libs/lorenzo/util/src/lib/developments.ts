import { Development } from "./development.interface";

export const DEVELOPMENTS: readonly Development[] = [
  {
    number: 1,
    period: 1,
    deck: 'territory',
    type: 'territory',
    permanentEffect: 'Harvest action of value 1 or more: gain 1 coin'
  },
  {
    number: 2,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 wood',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 wood'
  },
  {
    number: 3,
    period: 1,
    deck: 'territory',
    type: 'territory',
    permanentEffect: 'Harvest action of value 3 or more: gain 1 coin and 1 servant'
  },
  {
    number: 4,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 stone',
    permanentEffect: 'Harvest action of value 4 or more: lose 2 Victory Points'
  },
  {
    number: 5,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 wood',
    permanentEffect: 'Harvest action of value 5 or more: gain 3 wood'
  },
  {
    number: 6,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 Military Points and 1 servant',
    permanentEffect: 'Harvest action of value 5 or more: gain 1 Faith Point and 1 stone'
  },
  {
    number: 7,
    period: 1,
    deck: 'territory',
    type: 'territory',
    permanentEffect: 'Harvest action of value 5 or more: gain 2 Military Points and 1 stone'
  },
  {
    number: 8,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 3 coins',
    permanentEffect: 'Harvest action of value 6 or more: take 1 Council Privilege'
  },
  {
    number: 9,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 coin',
    permanentEffect: 'Harvest action of value 1 or more: gain 2 coins'
  },
  {
    number: 10,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 servant',
    permanentEffect: 'Harvest action of value 3 or more: gain 1 Military Point and 2 wood'
  },
  {
    number: 11,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 servants and 1 stone',
    permanentEffect: 'Harvest action of value 4 or more: gain 1 servant and 2 stone'
  },
  {
    number: 12,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 wood',
    permanentEffect: 'Harvest action of value 3 or more: gain 3 stone'
  },
  {
    number: 13,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 servants and 1 wood',
    permanentEffect: 'Harvest action of value 4 or more: gain 1 coin and 2 wood'
  },
  {
    number: 14,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 Faith Point',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 Faith Point'
  },
  {
    number: 15,
    period: 2,
    deck: 'territory',
    type: 'territory',
    permanentEffect: 'Harvest action of value 5 or more: gain 2 Military Points and 2 servants'
  },
  {
    number: 16,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 4 coins',
    permanentEffect: 'Harvest action of value 6 or more: gain 1 coin, 1 stone, and 2 wood'
  },
  {
    number: 17,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 coin and 1 servant',
    permanentEffect: 'Harvest action of value 1 or more: gain 3 coins'
  },
  {
    number: 18,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 Victory Point and 1 wood',
    permanentEffect: 'Harvest action of value 3 or more: gain 2 Victory Points and 2 wood'
  },
  {
    number: 19,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 Military Points',
    permanentEffect: 'Harvest action of value 5 or more: gain 4 Victory Points and 1 wood'
  },
  {
    number: 20,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 Victory Point and 2 stone'
  },
  {
    number: 21,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Take 1 Council Privilege and gain 1 stone',
    permanentEffect: 'Harvest action of value 6 or more: gain 4 Victory Points and 1 stone'
  },
  {
    number: 22,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 Faith Point',
    permanentEffect: 'Harvest action of value 1 or more: gain 1 coin and 1 Faith Point'
  },
  {
    number: 23,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 Victory Points and 2 coins',
    permanentEffect: 'Harvest action of value 4 or more: gain 3 Military Points and 1 servant'
  },
  {
    number: 24,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 Military Points and 1 servant',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 Military Point and 2 servants'
  },
  {
    number: 25,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 wood and 3 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 5 or more: gain 1 coin times your number of Building Cards'
  },
  {
    number: 26,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '3 wood and 1 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 5 or more: gain 1 coin times your number of Territory Cards'
  },
  {
    number: 27,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '2 coins and 2 stone',
    immediateEffect: 'Gain 6 Victory Points',
    permanentEffect: 'Production action of value 6 or more: gain 1 Victory Point times your number of Venture Cards'
  },
  {
    number: 28,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '2 coins and 2 wood',
    immediateEffect: 'Gain 6 Victory Points',
    permanentEffect: 'Production action of value 6 or more: gain 1 Victory Point times your number of Character Cards'
  },
  {
    number: 29,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 coin and 2 wood',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Production action of value 4 or more: exchange 1 wood for 3 coins OR 2 wood for 5 coins'
  },
  {
    number: 30,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 coin and 2 stone',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value 3 or more: exchange 1 stone for 3 coins OR 2 stone for 5 coins'
  },
  {
    number: 31,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '2 wood',
    immediateEffect: 'Gain 1 Faith Point',
    permanentEffect: 'Production action of value 2 or more: exchange 1 coin for 1 Faith Point'
  },
  {
    number: 32,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '2 stone',
    immediateEffect: 'Gain 1 Victory Point',
    permanentEffect: 'Production action of value 1 or more: exchange 1 coin for 1 Council Privilege'
  },
  {
    number: 33,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '2 wood and 1 stone',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Production action of value 3 or more: exchange 3 coins for 2 wood and 2 stone'
  },
  {
    number: 34,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '3 wood',
    immediateEffect: 'Gain 4 Victory Points',
    permanentEffect: 'Production action of value 3 or more: exchange 1 coin for 3 Victory Points OR 2 coins for 5 Victory Points'
  },
  {
    number: 35,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '4 wood',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 4 or more: exchange 1 wood for 3 Victory Points OR 3 wood for 7 Victory Points',
  },
  {
    number: 36,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '4 stone',
    immediateEffect: 'Gain 6 Victory Points',
    permanentEffect: 'Production action of value 5 or more: exchange 1 stone for 3 Victory Points OR 3 stone for 7 Victory Points'
  },
  {
    number: 37,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '1 wood and 2 stone',
    immediateEffect: 'Gain 4 Victory Points',
    permanentEffect: 'Production action of value 4 or more: exchange 1 servant, 1 wood, and 1 stone for 6 Victory Points'
  },
  {
    number: 38,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '3 stone',
    immediateEffect: 'Gain 2 Victory Points and 1 Faith Point',
    permanentEffect: 'Production action of value 2 or more: exchange 1 Faith Point for 2 coins and 2 Victory Points'
  },
  {
    number: 39,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '1 wood and 1 stone',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Production action of value 1 or more: exchange 1 servant for 3 Military Points'
  },
  {
    number: 40,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '2 coins, 2 wood, and 2 stone',
    immediateEffect: 'Gain 8 Victory Points',
    permanentEffect: 'Production action of value 6 or more: gain 2 Military Points and 2 Victory Points'
  },
  {
    number: 41,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '3 coins, 1 wood, and 3 stone',
    immediateEffect: 'Gain 7 Victory Points',
    permanentEffect: 'Production action of value 2 or more: gain 5 coins'
  },
  {
    number: 42,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '4 coins and 3 wood',
    immediateEffect: 'Gain 8 Victory Points',
    permanentEffect: 'Production action of value 4 or more: exchange 4 coins for 3 wood and 3 stone'
  },
  {
    number: 43,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '2 servants, 4 wood, and 2 stone',
    immediateEffect: 'Gain 10 Victory Points',
    permanentEffect: 'Production action of value 1 or more: gain 3 Victory Points'
  },
  {
    number: 44,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '2 coins, 2 wood, and 4 stone',
    immediateEffect: 'Gain 9 Victory Points',
    permanentEffect: 'Production action of value 5 or more: gain 2 Victory Points and 1 Council Privilege'
  },
  {
    number: 45,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '3 coins, 3 wood, and 1 stone',
    immediateEffect: 'Gain 9 Victory Points',
    permanentEffect: 'Production action of value 6 or more: exchange 1 coin for 2 servants and 4 Victory Points'
  },
  {
    number: 46,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '1 wood and 4 stone',
    immediateEffect: 'Gain 5 Victory Points and 1 Faith Point',
    permanentEffect: 'Production action of value 1 or more: exchange 1 wood OR 1 stone for 2 Faith Points'
  },
  {
    number: 47,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '1 servant, 2 wood, and 2 stone',
    immediateEffect: 'Gain 7 Victory Points',
    permanentEffect: 'Production action of value 3 or more: exchange 1 servant for 3 Military Points and 1 Victory Point'
  },
  {
    number: 48,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '4 wood and 4 stone',
    immediateEffect: 'Gain 7 Victory Points and 3 Faith Points',
    permanentEffect: 'Production action of value 2 or more: gain 1 Victory Point'
  },
  {
    number: 49,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Gain 3 Military Points',
    permanentEffect: 'When buying a Territory Card, increase the value by 2'
  },
  {
    number: 50,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    permanentEffect: 'When buying a Building Card, increase the value by 2 and decrease the cost by 1 wood OR 1 stone'
  },
  {
    number: 51,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    permanentEffect: 'When buying a Character Card, increase the value by 2 and decrease the cost by 1 coin'
  },
  {
    number: 52,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Take 1 Council Privilege',
    permanentEffect: 'When buying a Venture Card, increase the value by 2'
  },
  {
    number: 53,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    permanentEffect: 'Increase Harvest action value by 2'
  },
  {
    number: 54,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    permanentEffect: 'Increase Production action value by 2'
  },
  {
    number: 55,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Gain 4 Faith Points',
    permanentEffect: 'No bonus when you buy a card from the 3rd and 4th floors of the towers'
  },
  {
    number: 56,
    period: 1 ,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Buy any type of card up to value 4 and gain 1 Faith Point',
  },
  {
    number: 57,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    immediateEffect: 'Buy a Territory Card up to value 6 and gain 2 Military Points',
  },
  {
    number: 58,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    immediateEffect: 'Buy a Building Card up to value 6 with a discount of 1 wood/stone',
  },
  {
    number: 59,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Buy a Character Card up to value 6 with a discount of 2 coins',
  },
  {
    number: 60,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    immediateEffect: 'Buy a Venture Card up to value 6 and take 1 Council Privilege',
  },
  {
    number: 61,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    permanentEffect: 'Increase Harvest action value by 3'
  },
  {
    number: 62,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    permanentEffect: 'Increase Production action value by 3'
  },
  {
    number: 63,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: '3 Faith Points',
  },
  {
    number: 64,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Take 3 unique Council Privileges',
  },
  {
    number: 65,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Gain 2 Victory Points times your number of Territory Cards',
  },
  {
    number: 66,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Gain 2 Victory Points times your number of Building Cards',
  },
  {
    number: 67,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Gain 2 Victory Points times your number of Character Cards',
  },
  {
    number: 68,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Gain 2 Victory Points times your number of Venture Cards',
  },
  {
    number: 69,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '4 coins',
    immediateEffect: 'Perform a Harvest action at value 4 and gain 2 Faith Points',
  },
  {
    number: 70,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Perform a Production action at value 4 and gain 1 Faith Point',
  },
  {
    number: 71,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Gain 1 Victory Point times every 2 of your Military Points',
  },
  {
    number: 72,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Buy any type of card up to value 7 and take 1 Council Privilege',
  },
  {
    number: 73,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '4 coins',
    immediateEffect: 'Gain 5 Military Points',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    number: 74,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '1 coin, 1 wood, and 1 stone',
    immediateEffect: 'Gain 1 Faith Point',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    number: 75,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '3 stone',
    immediateEffect: 'Gain 2 Military Points and 1 Council Privilege',
    permanentEffect: 'End of game: gain 3 Victory Points'
  },
  {
    number: 76,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '2 wood and 2 stone',
    immediateEffect: 'Take 2 unique Council Privileges',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    number: 77,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '2 Military Points (you must have at least 3)',
    immediateEffect: 'Gain 3 coins',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    number: 78,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '3 wood',
    immediateEffect: 'Gain 4 servants',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    number: 79,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '3 Military Points (you must have at least 5)',
    immediateEffect: 'Gain 2 Faith Points',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    number: 80,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '2 Military Points (you must have at least 2)',
    immediateEffect: 'Gain 3 Faith Points',
    permanentEffect: 'End of game: gain 1 Victory Point'
  },
  {
    number: 81,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '6 coins',
    immediateEffect: 'Gain 6 Military Points',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    number: 82,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '2 coins, 2 wood, and 2 stone',
    immediateEffect: 'Gain 2 Faith Points',
    permanentEffect: 'End of game: gain 6 Victory Points'
  },
  {
    number: 83,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '4 stone',
    immediateEffect: 'Gain 3 Military Points and take 1 Council Privilege',
    permanentEffect: 'End of game: gain 2 Victory Points'
  },
  {
    number: 84,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '3 Military Points (you must have at least 6)',
    immediateEffect: 'Gain 5 coins and take 1 Council Privilege',
    permanentEffect: 'End of game: gain 3 Victory Points'
  },
  {
    number: 85,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '2 servants and 3 coins',
    immediateEffect: 'Perform a Harvest action at value 4',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    number: 86,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '4 wood',
    immediateEffect: 'Gain 5 servants',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    number: 87,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '4 Military Points (you must have at least 8)',
    immediateEffect: 'Gain 5 coins and 1 Faith Point',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    number: 88,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '4 Military Points (you must have at least 7)',
    immediateEffect: 'Gain 3 Faith Points',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    number: 89,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '8 coins',
    immediateEffect: 'Gain 7 Military Points',
    permanentEffect: 'End of game: gain 6 Victory Points'
  },
  {
    number: 90,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '3 coins, 3 wood, and 3 stone',
    immediateEffect: 'Buy any type of card up to value 7 and gain 1 Faith Point',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    number: 91,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '6 stone',
    immediateEffect: 'Gain 4 Military Points and take 1 Council Privilege',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    number: 92,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '6 wood',
    immediateEffect: 'Gain 3 Faith Points',
    permanentEffect: 'End of game: gain 3 Victory Points'
  },
  {
    number: 93,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '6 Military Points (you must have at least 12)',
    immediateEffect: '3 wood, 3 stone, and 3 coins',
    permanentEffect: 'End of game: gain 7 Victory Points'
  },
  {
    number: 94,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '3 servants and 4 coins',
    immediateEffect: 'Perform a Production action at value 3',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    number: 95,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '8 Military Points (you must have at least 15)',
    immediateEffect: 'Gain 4 Faith Points',
    permanentEffect: 'End of game: gain 8 Victory Points'
  },
  {
    number: 96,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '5 Military Points (you must have at least 10) OR 3 wood, 3 stone, and 4 coins',
    immediateEffect: 'Gain 2 Faith Points',
    permanentEffect: 'End of game: gain 10 Victory Points'
  },
  {
    number: 97,
    period: 1,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value 2 or more: gain 1 Special Token'
  },
  {
    number: 98,
    period: 1,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 1 Special Token',
    permanentEffect: 'Place 1 of your Special Tokens faceup here. On a Harvest action of value 2 or more, gain/perform whatever is shown on the Special Token'
  },
  {
    number: 99,
    period: 1,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value N: gain 1 wood times your number of Venture Cards (max N times)'
  },
  {
    number: 100,
    period: 1,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value N: gain 1 stone times your number of Character Cards (max N times)'
  },
  {
    number: 101,
    period: 2,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value 5 or more: gain 2 Faith Points'
  },
  {
    number: 102,
    period: 2,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 1 servant, 1 stone, 1 wood, and 1 coin',
    permanentEffect: 'Harvest action of value 3 or more: gain 2 Victory Points'
  },
  {
    number: 103,
    period: 2,
    deck: 'special',
    type: 'territory',
    permanentEffect: 'Harvest action of value 7 or more: gain 5 Victory Points'
  },
  {
    number: 104,
    period: 2,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Lose 3 Victory Points',
    permanentEffect: 'Harvest action of value 1 or more: gain 1 stone, 1 wood, 1 coin, and 1 servant'
  },
  {
    number: 105,
    period: 3,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 2 Special Tokens',
    permanentEffect: 'Harvest action of value 6 or more: gain 1 Faith Point, 2 Victory Points, and 2 coins'
  },
  {
    number: 106,
    period: 3,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 2 wood, 2 stone, and 2 coins',
    permanentEffect: 'Harvest action of value 5 or more: gain 3 Victory Points'
  },
  {
    number: 107,
    period: 3,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 2 Faith Points',
    permanentEffect: 'Harvest action of value N: gain 1 Victory Point times your number of Building Cards (max N times)'
  },
  {
    number: 108,
    period: 3,
    deck: 'special',
    type: 'territory',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Harvest action of value 7 or more: gain 2 wood, 2 stone, and 2 coins'
  },
  {
    number: 109,
    period: 1,
    deck: 'special',
    type: 'building',
    cost: 'Gain 1 wood and 1 stone',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value 1 or more: exchange 1 coin for 1 Special Token'
  },
  {
    number: 110,
    period: 1,
    deck: 'special',
    type: 'building',
    cost: '2 coins and 2 wood',
    immediateEffect: 'Gain 4 Victory Points',
    permanentEffect: 'Production action of value 5 or more: Gain 1 Special Token OR exchange 3 Special Tokens to play a Leader Card for free'
  },
  {
    number: 111,
    period: 1,
    deck: 'special',
    type: 'building',
    cost: '1 coin and 2 stone',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value N: exchange 1 stone for 1 coin and 1 Victory Point up to N times'
  },
  {
    number: 112,
    period: 1,
    deck: 'special',
    type: 'building',
    cost: '2 wood',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value N: exchange 1 wood for 1 coin and 1 Victory Point up to N times'
  },
  {
    number: 113,
    period: 2,
    deck: 'special',
    type: 'building',
    cost: '1 servant, 2 wood, and 2 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 3 or more: activate 1 of your Building Cards, ignoring its value'
  },
  {
    number: 114,
    period: 2,
    deck: 'special',
    type: 'building',
    cost: '2 servants, 1 coin, and 1 stone',
    immediateEffect: 'Gain 4 Victory Points and 1 Faith Point',
    permanentEffect: 'Production action of value 5 or more: activate 1 of your Building or Territory Cards, ignoring its value'
  },
  {
    number: 115,
    period: 2,
    deck: 'special',
    type: 'building',
    cost: '3 wood and 2 stone',
    immediateEffect: 'Gain 6 Victory Points and 1 Special Token',
    permanentEffect: 'Production action of value 4 or more: exchange 1 Special Token for 5 Victory Points'
  },
  {
    number: 116,
    period: 2,
    deck: 'special',
    type: 'building',
    cost: '5 wood',
    immediateEffect: 'Gain 7 Victory Points',
    permanentEffect: 'Production action of value 7 or more: exchange 1 wood and 1 stone for 3 Faith Points'
  },
  {
    number: 117,
    period: 3,
    deck: 'special',
    type: 'building',
    cost: '2 coins, 1 wood, and 4 stone',
    immediateEffect: 'Gain 7 Victory Points',
    permanentEffect: 'Production action of value 6 or more: 2 Victory Points times your number of played Leader Cards'
  },
  {
    number: 118,
    period: 3,
    deck: 'special',
    type: 'building',
    cost: '1 servant, 4 wood, and 3 stone',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Production action of value 7 or more: gain 7 Victory Points'
  },
  {
    number: 119,
    period: 3,
    deck: 'special',
    type: 'building',
    cost: '3 coins, 4 wood, and 3 stone',
    immediateEffect: 'Gain 15 Victory Points',
    permanentEffect: 'Production action of value 1 or more: lose 3 Victory Points'
  },
  {
    number: 120,
    period: 3,
    deck: 'special',
    type: 'building',
    cost: '2 servants, 3 wood, and 3 stone',
    immediateEffect: 'Gain 8 Victory Points',
    permanentEffect: 'Production action of value 5 or more: gain 3 Faith Points'
  },
  {
    number: 121,
    period: 1,
    deck: 'special',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Gain 1 Leader Card and 1 Faith Point',
  },
  {
    number: 122,
    period: 1,
    deck: 'special',
    type: 'character',
    cost: '2 coins',
    immediateEffect: 'Gain 2 Leader Cards',
  },
  {
    number: 123,
    period: 1,
    deck: 'special',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Gain 1 Special Token',
    permanentEffect: 'Increase both Production action and Harvest action values by 1'
  },
  {
    number: 124,
    period: 1,
    deck: 'special',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Gain 1 Special Token',
    permanentEffect: 'Whenever you play a Leader Card, gain a Special Token'
  },
  {
    number: 125,
    period: 2,
    deck: 'special',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Play a Leader Card for free',
  },
  {
    number: 126,
    period: 2,
    deck: 'special',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Gain 1 Special Token',
    permanentEffect: 'Ignore the 3 coin occupied tower cost when entering the Special Tower'
  },
  {
    number: 127,
    period: 2,
    deck: 'special',
    type: 'character',
    cost: '6 coins and 1 Special Token',
    immediateEffect: 'Gain 2 Victory Points',
    permanentEffect: 'Whenever you play a Leader Card, ignore 1 of its requirements'
  },
  {
    number: 128,
    period: 2,
    deck: 'special',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Gain 2 Special Tokens',
    permanentEffect: 'Place 1 of your Special Tokens faceup here. Whenever you occupy a Market action space, gain/perform whatever is shown on the Special Token'
  },
  {
    number: 129,
    period: 3,
    deck: 'special',
    type: 'character',
    cost: '6 coins',
    immediateEffect: '3 Victory Points times your number of played Leader Cards',
  },
  {
    number: 130,
    period: 3,
    deck: 'special',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Take a discarded card of any type (except Special Development) for free',
  },
  {
    number: 131,
    period: 3,
    deck: 'special',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Gain 1 Victory Point times your number of Faith Points',
  },
  {
    number: 132,
    period: 3,
    deck: 'special',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Take a discarded Venture Card (not from the Special Development deck) for free',
  },
  {
    number: 133,
    period: 1,
    deck: 'special',
    type: 'venture',
    cost: '2 coins and 2 stone',
    immediateEffect: 'Gain 2 Special Tokens',
    permanentEffect: 'End of game: gain 2 Victory Points times your number of Special Tokens (max 12 points)'
  },
  {
    number: 134,
    period: 1,
    deck: 'special',
    type: 'venture',
    cost: '2 Military Points (you must have at least 2)',
    immediateEffect: 'Gain 2 wood and 2 stone',
    permanentEffect: 'End of game: gain 2 Victory Points times each 1 wood and 1 stone you have (max 12 points)'
  },
  {
    number: 135,
    period: 1,
    deck: 'special',
    type: 'venture',
    cost: '2 wood and 1 stone',
    immediateEffect: 'Gain 3 servants',
    permanentEffect: 'End of game: gain 1 Victory Point times your number of servants (max 12 points)'
  },
  {
    number: 136,
    period: 1,
    deck: 'special',
    type: 'venture',
    cost: '1 coin and 3 wood',
    immediateEffect: "If you aren't currently first on the Military Track, move your marker to the same position as the highest marker",
    permanentEffect: 'End of game: gain 5 victory points'
  },
  {
    number: 137,
    period: 2,
    deck: 'special',
    type: 'venture',
    cost: '2 coins, 1 wood, and 3 stone',
    immediateEffect: 'Gain 2 Military Points',
    permanentEffect: 'End of game: gain 1 Victory Point times every 2 of your Military Points'
  },
  {
    number: 138,
    period: 2,
    deck: 'special',
    type: 'venture',
    cost: '5 Military Points (you must have at least 7), 2 wood, 1 stone, and 1 servant',
    immediateEffect: 'Gain 5 Faith Points and 1 Special Token',
    permanentEffect: 'End of game: gain 5 Victory Points'
  },
  {
    number: 139,
    period: 2,
    deck: 'special',
    type: 'venture',
    cost: '5 Military Points (you must have at least 5) OR 2 wood, 1 coin, and 1 Faith Point',
    immediateEffect: 'Gain 3 Special Tokens',
    permanentEffect: 'End of game: gain 3 Victory Points'
  },
  {
    number: 140,
    period: 2,
    deck: 'special',
    type: 'venture',
    cost: '5 coins',
    immediateEffect: 'Activate 2 of your Territory Cards, ignoring their values',
    permanentEffect: 'End of game: gain 6 Victory Points',
  },
  {
    number: 141,
    period: 3,
    deck: 'special',
    type: 'venture',
    cost: '10 coins OR 5 Special Tokens',
    immediateEffect: 'Gain 2 Military Points',
    permanentEffect: 'End of game: gain 15 Victory Points'
  },
  {
    number: 142,
    period: 3,
    deck: 'special',
    type: 'venture',
    cost: '8 wood and 8 stone',
    immediateEffect: 'Gain 3 Special Tokens',
    permanentEffect: 'End of game: gain 12 Victory Points'
  },
  {
    number: 143,
    period: 3,
    deck: 'special',
    type: 'venture',
    cost: '6 Military Points (you must have at least 12) and 6 coins',
    immediateEffect: 'Gain 4 Faith Points',
    permanentEffect: 'End of game: gain 10 Victory Points'
  },
  {
    number: 144,
    period: 3,
    deck: 'special',
    type: 'venture',
    cost: '7 Military Points (you must have at least 14) and 5 servants',
    immediateEffect: 'Activate 2 of your Building Cards, ignoring their values',
    permanentEffect: 'End of game: gain 12 Victory Points'
  },
  {
    number: 145,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 5 coins',
    permanentEffect: 'Harvest action of value 3 or more: lose 1 Victory Point'
  },
  {
    number: 146,
    period: 1,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 3 wood and 3 stone',
    permanentEffect: 'Harvest action of value 4 or more: lose 2 Victory Points'
  },
  {
    number: 147,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 wood and 1 servant',
    permanentEffect: 'Harvest action of value 5 or more: gain 3 wood OR 3 servants'
  },
  {
    number: 148,
    period: 2,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 1 Military Point and 1 Faith Point',
    permanentEffect: 'Harvest action of value 4 or more: gain 2 Military Points OR 1 Faith Point'
  },
  {
    number: 149,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 wood and 2 stone',
    permanentEffect: 'Harvest action of value 4 or more: gain 3 stone OR 3 wood'
  },
  {
    number: 150,
    period: 3,
    deck: 'territory',
    type: 'territory',
    immediateEffect: 'Gain 2 coins and 2 servants',
    permanentEffect: 'Harvest action of value 5 or more: gain 1 Victory Point and 3 Faith Points'
  },
  {
    number: 151,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Gain 1 stone',
    permanentEffect: 'Ignore the -3 penalty when occupying the large Production action space'
  },
  {
    number: 152,
    period: 1,
    deck: 'character',
    type: 'character',
    cost: '3 coins',
    immediateEffect: 'Gain 1 wood',
    permanentEffect: 'Ignore the -3 penalty when occupying the large Harvest action space'
  },
  {
    number: 153,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Perform a Production action at value 3 using the Building Cards belonging to another player of your choosing (spending your own resources)',
    permanentEffect: 'Increase Production action value by 1'
  },
  {
    number: 154,
    period: 2,
    deck: 'character',
    type: 'character',
    cost: '6 coins',
    immediateEffect: 'Perform a Harvest action at value 2 using the Territory Cards belonging to another player of your choosing (spending your own resources)',
    permanentEffect: 'Increase Harvest action value by 1'
  },
  {
    number: 155,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '5 coins',
    immediateEffect: 'Gain 3 Victory Points and each of your opponents must discard 1 Building Card OR 1 Territory Card (they choose)',
  },
  {
    number: 156,
    period: 3,
    deck: 'character',
    type: 'character',
    cost: '7 coins',
    immediateEffect: 'Take 2 Council Privileges and each of your opponents must discard 1 Character Card OR 1 Venture Card (they choose)',
  },
  {
    number: 157,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 coin, 1 wood, and 1 stone',
    immediateEffect: 'Gain 3 Victory Points',
    permanentEffect: 'Production action of value 2 or more: exchange 1 Victory Point for 1 Council Privilege'
  },
  {
    number: 158,
    period: 1,
    deck: 'building',
    type: 'building',
    cost: '1 servant, 1 coin, and 2 wood',
    immediateEffect: 'Take 2 Council Privileges',
    permanentEffect: 'Production action of value 6 or more: lose 1 Victory Point times your number of opponents and each opponent must give you 2 coins OR 3 Victory Points (they choose)'
  },
  {
    number: 159,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '2 coins and 2 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 5 ore more: discard 1 of your Character Cards to gain 7 Victory Points'
  },
  {
    number: 160,
    period: 2,
    deck: 'building',
    type: 'building',
    cost: '1 servant and 2 wood',
    immediateEffect: 'Gain 2 Military Points',
    permanentEffect: 'Production action of value 4 or more: lose 1 Military Point times your number of opponents and each opponent must give you 2 servants OR 3 Victory Points (they choose)'
  },
  {
    number: 161,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '2 coins, 1 wood, and 2 stone',
    immediateEffect: 'Gain 5 Victory Points',
    permanentEffect: 'Production action of value 2 or more: gain the reward of an empty Market action space OR take 1 Council Privilege'
  },
  {
    number: 162,
    period: 3,
    deck: 'building',
    type: 'building',
    cost: '2 coins, 4 wood, and 1 Faith Point',
    immediateEffect: 'Gain 8 Victory Points',
    permanentEffect: 'Production action of value 4 or more: discard 1 played Leader Card and gain 6 Victory Points'
  },
  {
    number: 163,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '1 Military Point times your number of opponents',
    immediateEffect: 'Each of your opponents must give you 1 wood OR 1 stone OR 1 coin OR 1 servant (they choose)',
    permanentEffect: 'End of game: gain 4 Victory Points'
  },
  {
    number: 164,
    period: 1,
    deck: 'venture',
    type: 'venture',
    cost: '3 coins and 2 servants',
    immediateEffect: 'Draw 2 Leader Cards',
    permanentEffect: 'End of game: gain 2 Victory Points times your played Leader Cards'
  },
  {
    number: 165,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '2 Military Points times your number of opponents',
    immediateEffect: 'Each of your opponents must give you 2 wood OR 2 stone OR 2 coins OR 2 servants (they choose)',
    permanentEffect: 'End of game: gain 6 Victory Points'
  },
  {
    number: 166,
    period: 2,
    deck: 'venture',
    type: 'venture',
    cost: '5 wood',
    immediateEffect: 'Gain 3 coins',
    permanentEffect: 'End of game: gain 2 Victory Points times your number of Building Cards'
  },
  {
    number: 167,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '3 Military Points times your number of opponents',
    immediateEffect: 'Each of your opponents must give you 3 wood OR 3 stone OR 3 coins OR 3 servants (they choose)',
    permanentEffect: 'End of game: gain 8 Victory Points'
  },
  {
    number: 168,
    period: 3,
    deck: 'venture',
    type: 'venture',
    cost: '7 wood OR 7 stone',
    immediateEffect: 'Buy any type of card up to value 7',
    permanentEffect: 'End of game: gain 7 Victory Points'
  }
];
