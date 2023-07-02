import { Injectable } from '@angular/core';

import { BatchService, DataService } from '@atocha/core/data-access';
import { Endpoint } from '@atocha/menu-matriarch/shared/data-access-api';
import {
  createDishDto,
  createIngredientDto,
  createIngredientTypeDto,
  createMealDto,
  createMenuDto,
  createTagDto,
  createUserDto,
} from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

@Injectable({
  providedIn: 'root',
})
export class SeedDataService {
  constructor(
    private _batchService: BatchService,
    private _dataService: DataService
  ) {}

  async createUserData({
    uid,
    name,
    email,
  }: {
    uid: string;
    name: string;
    email: string;
  }): Promise<string> {
    const ids = new SeedDataIds(this._dataService.createId);
    const batch = this._batchService.createBatch();

    batch
      .set({
        endpoint: Endpoint.users,
        id: uid,
        data: createUserDto({
          uid,
          name,
          email,
          preferences: {
            darkMode: false,
            dayNameDisplay: 'full',
            defaultMenuStartDay: 'Monday',
            emptyMealText: 'undecided',
            mealOrientation: 'vertical',
            ingredientTypeOrder: [
              ids.ingredientTypes.produce,
              ids.ingredientTypes.refrigerated,
              ids.ingredientTypes.spice,
            ],
          },
        }),
      })
      .set({
        endpoint: Endpoint.menus,
        id: ids.menus.menu,
        data: createMenuDto({
          id: ids.menus.menu,
          uid,
          name: 'Menu #1',
          contents: {
            Monday: [ids.dishes.enchiladas],
            Tuesday: [ids.dishes.sushi, ids.dishes.misoSoup],
            Wednesday: [ids.dishes.salmonBurgers, ids.dishes.sweetPotatoFries],
            Thursday: [ids.dishes.redLentilSoup],
            Friday: [ids.dishes.pizza, ids.dishes.tiramisu],
            Saturday: [ids.dishes.thaiCurry, ids.dishes.tiramisu],
            Sunday: [
              ids.dishes.friedChicken,
              ids.dishes.cornbread,
              ids.dishes.macAndCheese,
            ],
          },
        }),
      })
      .set({
        endpoint: Endpoint.meals,
        id: ids.meals.southernClassic,
        data: createMealDto({
          id: ids.meals.southernClassic,
          uid,
          name: 'Southern Classic',
          dishIds: [
            ids.dishes.cornbread,
            ids.dishes.friedChicken,
            ids.dishes.macAndCheese,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.meals,
        id: ids.meals.sushiDinner,
        data: createMealDto({
          id: ids.meals.sushiDinner,
          uid,
          name: 'Sushi Dinner',
          dishIds: [ids.dishes.sushi, ids.dishes.misoSoup],
          tagIds: [ids.tags.pescatarian],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.cornbread,
        data: createDishDto({
          id: ids.dishes.cornbread,
          uid,
          name: 'Cornbread',
          description: 'Made in the skillet with brown butter',
          type: 'side',
          link: 'https://cooking.nytimes.com/recipes/1016965-brown-butter-skillet-cornbread',
          menuIds: [ids.menus.menu],
          mealIds: [ids.meals.southernClassic],
          tagIds: [ids.tags.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.enchiladas,
        data: createDishDto({
          id: ids.dishes.enchiladas,
          uid,
          name: 'Enchiladas',
          link: 'https://cooking.nytimes.com/recipes/1018152-enchiladas-con-carne',
          menuIds: [ids.menus.menu],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.friedChicken,
        data: createDishDto({
          id: ids.dishes.friedChicken,
          uid,
          name: 'Fried Chicken',
          link: 'https://cooking.nytimes.com/recipes/1018219-buttermilk-fried-chicken',
          menuIds: [ids.menus.menu],
          mealIds: [ids.meals.southernClassic],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.greekSalad,
        data: createDishDto({
          id: ids.dishes.greekSalad,
          uid,
          name: 'Greek Salad',
          tagIds: [ids.tags.vegetarian],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.huevosRotos,
        data: createDishDto({
          id: ids.dishes.huevosRotos,
          uid,
          name: 'Huevos Rotos',
          link: 'https://cooking.nytimes.com/recipes/1020055-huevos-rotos-broken-eggs',
          ingredientIds: [
            ids.ingredients.eggs,
            ids.ingredients.garlic,
            ids.ingredients.oliveOil,
            ids.ingredients.onion,
            ids.ingredients.paprika,
            ids.ingredients.pepper,
            ids.ingredients.potato,
            ids.ingredients.salt,
          ],
          tagIds: [ids.tags.vegetarian],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.macAndCheese,
        data: createDishDto({
          id: ids.dishes.macAndCheese,
          uid,
          name: 'Macaroni and Cheese',
          description: 'Delicious baked noodles from the USA',
          type: 'side',
          link: 'https://cooking.nytimes.com/recipes/1015825-creamy-macaroni-and-cheese',
          menuIds: [ids.menus.menu],
          mealIds: [ids.meals.southernClassic],
          tagIds: [ids.tags.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.misoSoup,
        data: createDishDto({
          id: ids.dishes.misoSoup,
          uid,
          name: 'Miso Soup',
          type: 'side',
          menuIds: [ids.menus.menu],
          mealIds: [ids.meals.sushiDinner],
          tagIds: [ids.tags.vegan, ids.tags.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.pizza,
        data: createDishDto({
          id: ids.dishes.pizza,
          uid,
          name: 'Pizza',
          description: 'Delicious round vessel from Italy',
          link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
          menuIds: [ids.menus.menu],
          tagIds: [ids.tags.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.redLentilSoup,
        data: createDishDto({
          id: ids.dishes.redLentilSoup,
          uid,
          name: 'Red Lentil Soup',
          link: 'https://cooking.nytimes.com/recipes/1016062-red-lentil-soup-with-lemon',
          menuIds: [ids.menus.menu],
          tagIds: [ids.tags.vegan, ids.tags.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.roastedCauliflower,
        data: createDishDto({
          id: ids.dishes.roastedCauliflower,
          uid,
          name: 'Roasted Cauliflower',
          link: 'https://cooking.nytimes.com/recipes/7588-roasted-cauliflower',
          type: 'side',
          tagIds: [ids.tags.easy, ids.tags.vegan, ids.tags.vegetarian],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.salmonBurgers,
        data: createDishDto({
          id: ids.dishes.salmonBurgers,
          uid,
          name: 'Salmon Burgers',
          link: 'https://cooking.nytimes.com/recipes/7131-salmon-burgers',
          menuIds: [ids.menus.menu],
          tagIds: [ids.tags.pescatarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.sushi,
        data: createDishDto({
          id: ids.dishes.sushi,
          uid,
          name: 'Sushi',
          description: 'Delicious tiny vessels from Japan',
          menuIds: [ids.menus.menu],
          mealIds: [ids.meals.sushiDinner],
          tagIds: [ids.tags.pescatarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.sweetPotatoFries,
        data: createDishDto({
          id: ids.dishes.sweetPotatoFries,
          uid,
          name: 'Sweet Potato Fries',
          type: 'side',
          menuIds: [ids.menus.menu],
          tagIds: [ids.tags.vegan, ids.tags.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.tiramisu,
        data: createDishDto({
          id: ids.dishes.tiramisu,
          uid,
          name: 'Tiramisu',
          description: 'Delicious coffee-flavored Italian cake',
          link: 'https://cooking.nytimes.com/recipes/1018684-classic-tiramisu',
          type: 'dessert',
          menuIds: [ids.menus.menu],
          tagIds: [],
          usages: 2,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishes.thaiCurry,
        data: createDishDto({
          id: ids.dishes.thaiCurry,
          uid,
          name: 'Thai Curry',
          description: 'Delicious fragrant stew from Thailand',
          link: 'https://cooking.nytimes.com/recipes/1015694-vegan-thai-curry-vegetables',
          menuIds: [ids.menus.menu],
          tagIds: [ids.tags.easy, ids.tags.vegan, ids.tags.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.ingredientTypes,
        id: ids.ingredientTypes.produce,
        data: createIngredientTypeDto({
          id: ids.ingredientTypes.produce,
          uid,
          name: 'Produce',
          ingredientIds: [
            ids.ingredients.garlic,
            ids.ingredients.onion,
            ids.ingredients.potato,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.ingredientTypes,
        id: ids.ingredientTypes.refrigerated,
        data: createIngredientTypeDto({
          id: ids.ingredientTypes.refrigerated,
          uid,
          name: 'Refrigerated',
          ingredientIds: [ids.ingredients.eggs, ids.ingredients.oliveOil],
        }),
      })
      .set({
        endpoint: Endpoint.ingredientTypes,
        id: ids.ingredientTypes.spice,
        data: createIngredientTypeDto({
          id: ids.ingredientTypes.spice,
          uid,
          name: 'Spice',
          ingredientIds: [
            ids.ingredients.paprika,
            ids.ingredients.pepper,
            ids.ingredients.salt,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredients.eggs,
        data: createIngredientDto({
          id: ids.ingredients.eggs,
          uid,
          name: 'Eggs',
          typeId: ids.ingredientTypes.refrigerated,
          dishIds: [ids.dishes.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredients.garlic,
        data: createIngredientDto({
          id: ids.ingredients.garlic,
          uid,
          name: 'Garlic',
          typeId: ids.ingredientTypes.produce,
          dishIds: [ids.ingredientTypes.refrigerated],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredients.oliveOil,
        data: createIngredientDto({
          id: ids.ingredients.oliveOil,
          uid,
          name: 'Olive Oil',
          typeId: ids.ingredientTypes.refrigerated,
          dishIds: [ids.dishes.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredients.onion,
        data: createIngredientDto({
          id: ids.ingredients.onion,
          uid,
          name: 'Onion',
          typeId: ids.ingredientTypes.produce,
          dishIds: [ids.ingredientTypes.refrigerated],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredients.paprika,
        data: createIngredientDto({
          id: ids.ingredients.paprika,
          uid,
          name: 'Paprika',
          typeId: ids.ingredientTypes.spice,
          dishIds: [ids.dishes.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredients.pepper,
        data: createIngredientDto({
          id: ids.ingredients.pepper,
          uid,
          name: 'Pepper',
          typeId: ids.ingredientTypes.spice,
          dishIds: [ids.dishes.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredients.potato,
        data: createIngredientDto({
          id: ids.ingredients.potato,
          uid,
          name: 'Potato',
          typeId: ids.ingredientTypes.produce,
          dishIds: [ids.ingredientTypes.refrigerated],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredients.salt,
        data: createIngredientDto({
          id: ids.ingredients.salt,
          uid,
          name: 'Salt',
          typeId: ids.ingredientTypes.spice,
          dishIds: [ids.dishes.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.tags.easy,
        data: createTagDto({
          id: ids.tags.easy,
          uid,
          name: 'Easy',
          dishIds: [ids.dishes.roastedCauliflower, ids.dishes.thaiCurry],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.tags.pescatarian,
        data: createTagDto({
          id: ids.tags.pescatarian,
          uid,
          name: 'Pescatarian',
          dishIds: [ids.dishes.salmonBurgers, ids.dishes.sushi],
          mealIds: [ids.meals.sushiDinner],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.tags.vegan,
        data: createTagDto({
          id: ids.tags.vegan,
          uid,
          name: 'Vegan',
          dishIds: [
            ids.dishes.misoSoup,
            ids.dishes.redLentilSoup,
            ids.dishes.roastedCauliflower,
            ids.dishes.sweetPotatoFries,
            ids.dishes.thaiCurry,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.tags.vegetarian,
        data: createTagDto({
          id: ids.tags.vegetarian,
          uid,
          name: 'Vegetarian',
          dishIds: [
            ids.dishes.cornbread,
            ids.dishes.greekSalad,
            ids.dishes.huevosRotos,
            ids.dishes.macAndCheese,
            ids.dishes.misoSoup,
            ids.dishes.pizza,
            ids.dishes.redLentilSoup,
            ids.dishes.roastedCauliflower,
            ids.dishes.sweetPotatoFries,
            ids.dishes.thaiCurry,
          ],
        }),
      });
    await batch.commit();
    return ids.menus.menu;
  }
}
