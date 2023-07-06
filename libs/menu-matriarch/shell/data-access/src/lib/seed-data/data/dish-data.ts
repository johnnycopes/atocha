import { DishDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export function createDishData(
  uid: string,
  { dishIds, ingredientIds, mealIds, menuIds, tagIds }: SeedDataIds
): Partial<DishDto>[] {
  return [
    {
      id: dishIds.cornbread,
      uid,
      name: 'Cornbread',
      description: 'Made in the skillet with brown butter',
      type: 'side',
      link: 'https://cooking.nytimes.com/recipes/1016965-brown-butter-skillet-cornbread',
      menuIds: [menuIds.menu],
      mealIds: [mealIds.southernClassic],
      tagIds: [tagIds.vegetarian],
      usages: 1,
    },
    {
      id: dishIds.enchiladas,
      uid,
      name: 'Enchiladas',
      link: 'https://cooking.nytimes.com/recipes/1018152-enchiladas-con-carne',
      menuIds: [menuIds.menu],
      mealIds: [mealIds.mexicanMedley],
      ingredientIds: [
        ingredientIds.avocadoOil,
        ingredientIds.cannedTomatoes,
        ingredientIds.cheddarCheese,
        ingredientIds.chickenStock,
        ingredientIds.chiliPowder,
        ingredientIds.cumin,
        ingredientIds.flour,
        ingredientIds.garlic,
        ingredientIds.groundBeef,
        ingredientIds.onion,
        ingredientIds.oregano,
        ingredientIds.pepper,
        ingredientIds.salt,
        ingredientIds.serranoPepper,
        ingredientIds.tortillas,
      ],
      usages: 1,
    },
    {
      id: dishIds.friedChicken,
      uid,
      name: 'Fried Chicken',
      link: 'https://cooking.nytimes.com/recipes/1018219-buttermilk-fried-chicken',
      menuIds: [menuIds.menu],
      mealIds: [mealIds.southernClassic],
      usages: 1,
    },
    {
      id: dishIds.greekSalad,
      uid,
      name: 'Greek Salad',
      tagIds: [tagIds.vegetarian],
    },
    {
      id: dishIds.guacamole,
      uid,
      name: 'Guacamole',
      type: 'side',
      mealIds: [mealIds.mexicanMedley],
      ingredientIds: [
        ingredientIds.avocado,
        ingredientIds.cilantro,
        ingredientIds.lime,
        ingredientIds.onion,
        ingredientIds.salt,
        ingredientIds.serranoPepper,
        ingredientIds.tomato,
      ],
      tagIds: [tagIds.easy, tagIds.vegetarian, tagIds.vegan],
    },
    {
      id: dishIds.huevosRotos,
      uid,
      name: 'Huevos Rotos',
      link: 'https://cooking.nytimes.com/recipes/1020055-huevos-rotos-broken-eggs',
      ingredientIds: [
        ingredientIds.eggs,
        ingredientIds.garlic,
        ingredientIds.oliveOil,
        ingredientIds.onion,
        ingredientIds.paprika,
        ingredientIds.pepper,
        ingredientIds.potato,
        ingredientIds.salt,
      ],
      tagIds: [tagIds.vegetarian],
    },
    {
      id: dishIds.macAndCheese,
      uid,
      name: 'Macaroni and Cheese',
      description: 'Delicious baked noodles from the USA',
      type: 'side',
      link: 'https://cooking.nytimes.com/recipes/1015825-creamy-macaroni-and-cheese',
      menuIds: [menuIds.menu],
      mealIds: [mealIds.southernClassic],
      tagIds: [tagIds.vegetarian],
      usages: 1,
    },
    {
      id: dishIds.misoSoup,
      uid,
      name: 'Miso Soup',
      type: 'side',
      menuIds: [menuIds.menu],
      mealIds: [mealIds.sushiDinner],
      tagIds: [tagIds.vegan, tagIds.vegetarian],
      usages: 1,
    },
    {
      id: dishIds.pizza,
      uid,
      name: 'Pizza',
      description: 'Delicious round vessel from Italy',
      link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
      menuIds: [menuIds.menu],
      ingredientIds: [
        ingredientIds.basil,
        ingredientIds.mozzarellaCheese,
        ingredientIds.oliveOil,
        ingredientIds.oregano,
        ingredientIds.pizzaDough,
        ingredientIds.tomatoSauce,
      ],
      tagIds: [tagIds.vegetarian],
      usages: 1,
    },
    {
      id: dishIds.redLentilSoup,
      uid,
      name: 'Red Lentil Soup',
      link: 'https://cooking.nytimes.com/recipes/1016062-red-lentil-soup-with-lemon',
      menuIds: [menuIds.menu],
      tagIds: [tagIds.vegan, tagIds.vegetarian],
      usages: 1,
    },
    {
      id: dishIds.roastedCauliflower,
      uid,
      name: 'Roasted Cauliflower',
      link: 'https://cooking.nytimes.com/recipes/7588-roasted-cauliflower',
      type: 'side',
      ingredientIds: [
        ingredientIds.cauliflower,
        ingredientIds.oliveOil,
        ingredientIds.pepper,
        ingredientIds.salt,
      ],
      tagIds: [tagIds.easy, tagIds.vegan, tagIds.vegetarian],
    },
    {
      id: dishIds.salmonBurgers,
      uid,
      name: 'Salmon Burgers',
      link: 'https://cooking.nytimes.com/recipes/7131-salmon-burgers',
      menuIds: [menuIds.menu],
      tagIds: [tagIds.pescatarian],
      usages: 1,
    },
    {
      id: dishIds.sushi,
      uid,
      name: 'Sushi',
      description: 'Delicious tiny vessels from Japan',
      menuIds: [menuIds.menu],
      mealIds: [mealIds.sushiDinner],
      tagIds: [tagIds.pescatarian],
      usages: 1,
    },
    {
      id: dishIds.sweetPotatoFries,
      uid,
      name: 'Sweet Potato Fries',
      type: 'side',
      menuIds: [menuIds.menu],
      tagIds: [tagIds.vegan, tagIds.vegetarian],
      usages: 1,
    },
    {
      id: dishIds.tiramisu,
      uid,
      name: 'Tiramisu',
      description: 'Delicious coffee-flavored Italian cake',
      link: 'https://cooking.nytimes.com/recipes/1018684-classic-tiramisu',
      type: 'dessert',
      menuIds: [menuIds.menu],
      tagIds: [],
      usages: 2,
    },
    {
      id: dishIds.thaiCurry,
      uid,
      name: 'Thai Curry',
      description: 'Delicious fragrant stew from Thailand',
      link: 'https://cooking.nytimes.com/recipes/1015694-vegan-thai-curry-vegetables',
      menuIds: [menuIds.menu],
      tagIds: [tagIds.easy, tagIds.vegan, tagIds.vegetarian],
      usages: 1,
    },
  ];
}
