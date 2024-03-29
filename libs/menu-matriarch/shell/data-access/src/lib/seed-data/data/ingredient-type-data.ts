import { createIngredientTypeDto } from '@atocha/menu-matriarch/ingredients/data-access';
import { SeedDataIds } from './seed-data-ids';

export function createIngredientTypeData(
  uid: string,
  { ingredientIds, ingredientTypeIds: ingredientTypesIds }: SeedDataIds
) {
  return [
    {
      id: ingredientTypesIds.bread,
      uid,
      name: 'Bread',
      ingredientIds: [ingredientIds.pizzaDough, ingredientIds.tortillas],
    },
    {
      id: ingredientTypesIds.condiment,
      uid,
      name: 'Condiment',
      ingredientIds: [
        ingredientIds.ketchup,
        ingredientIds.mayonnaise,
        ingredientIds.mustard,
      ],
    },
    {
      id: ingredientTypesIds.dryGood,
      uid,
      name: 'Dry Good',
      ingredientIds: [
        ingredientIds.arborioRice,
        ingredientIds.basmatiRice,
        ingredientIds.jasmineRice,
      ],
    },
    {
      id: ingredientTypesIds.frozen,
      uid,
      name: 'Frozen',
      ingredientIds: [],
    },
    {
      id: ingredientTypesIds.meat,
      uid,
      name: 'Meat',
      ingredientIds: [ingredientIds.chickenThighs, ingredientIds.groundBeef],
    },
    {
      id: ingredientTypesIds.oil,
      uid,
      name: 'Oil',
      ingredientIds: [
        ingredientIds.avocadoOil,
        ingredientIds.coconutOil,
        ingredientIds.oliveOil,
        ingredientIds.sesameOil,
      ],
    },
    {
      id: ingredientTypesIds.preserved,
      uid,
      name: 'Preserved',
      ingredientIds: [
        ingredientIds.cannedSalmon,
        ingredientIds.cannedTomatoes,
        ingredientIds.chickpeas,
        ingredientIds.chickenStock,
        ingredientIds.tomatoSauce,
      ],
    },
    {
      id: ingredientTypesIds.produce,
      uid,
      name: 'Produce',
      ingredientIds: [
        ingredientIds.avocado,
        ingredientIds.bellPepper,
        ingredientIds.broccoli,
        ingredientIds.cauliflower,
        ingredientIds.eggplant,
        ingredientIds.garlic,
        ingredientIds.lemon,
        ingredientIds.lime,
        ingredientIds.mushroom,
        ingredientIds.onion,
        ingredientIds.potato,
        ingredientIds.serranoPepper,
        ingredientIds.spinach,
        ingredientIds.sweetPotato,
        ingredientIds.tomato,
      ],
    },
    {
      id: ingredientTypesIds.refrigerated,
      uid,
      name: 'Refrigerated',
      ingredientIds: [
        ingredientIds.cheddarCheese,
        ingredientIds.eggs,
        ingredientIds.mozzarellaCheese,
      ],
    },
    {
      id: ingredientTypesIds.seafood,
      uid,
      name: 'Seafood',
      ingredientIds: [ingredientIds.salmon, ingredientIds.tuna],
    },
    {
      id: ingredientTypesIds.spice,
      uid,
      name: 'Spice',
      ingredientIds: [
        ingredientIds.adobo,
        ingredientIds.basil,
        ingredientIds.bayLeaves,
        ingredientIds.cardamom,
        ingredientIds.cayennePepper,
        ingredientIds.chiliPowder,
        ingredientIds.chives,
        ingredientIds.cinnamon,
        ingredientIds.cilantro,
        ingredientIds.coriander,
        ingredientIds.crushedRedPepper,
        ingredientIds.cumin,
        ingredientIds.flour,
        ingredientIds.garlicPowder,
        ingredientIds.nutmeg,
        ingredientIds.oregano,
        ingredientIds.paprika,
        ingredientIds.parsley,
        ingredientIds.pepper,
        ingredientIds.sage,
        ingredientIds.salt,
        ingredientIds.thyme,
        ingredientIds.turmeric,
      ],
    },
  ].map(createIngredientTypeDto);
}
