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
    const ids = new SeedDataIds(
      this._dataService.createId.bind(this._dataService)
    );
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
              ids.ingredientTypesIds.produce,
              ids.ingredientTypesIds.refrigerated,
              ids.ingredientTypesIds.spice,
            ],
          },
        }),
      })
      .set({
        endpoint: Endpoint.menus,
        id: ids.menuIds.menu,
        data: createMenuDto({
          id: ids.menuIds.menu,
          uid,
          name: 'Menu #1',
          contents: {
            Monday: [ids.dishIds.enchiladas],
            Tuesday: [ids.dishIds.sushi, ids.dishIds.misoSoup],
            Wednesday: [
              ids.dishIds.salmonBurgers,
              ids.dishIds.sweetPotatoFries,
            ],
            Thursday: [ids.dishIds.redLentilSoup],
            Friday: [ids.dishIds.pizza, ids.dishIds.tiramisu],
            Saturday: [ids.dishIds.thaiCurry, ids.dishIds.tiramisu],
            Sunday: [
              ids.dishIds.friedChicken,
              ids.dishIds.cornbread,
              ids.dishIds.macAndCheese,
            ],
          },
        }),
      })
      .set({
        endpoint: Endpoint.meals,
        id: ids.mealIds.southernClassic,
        data: createMealDto({
          id: ids.mealIds.southernClassic,
          uid,
          name: 'Southern Classic',
          dishIds: [
            ids.dishIds.cornbread,
            ids.dishIds.friedChicken,
            ids.dishIds.macAndCheese,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.meals,
        id: ids.mealIds.sushiDinner,
        data: createMealDto({
          id: ids.mealIds.sushiDinner,
          uid,
          name: 'Sushi Dinner',
          dishIds: [ids.dishIds.sushi, ids.dishIds.misoSoup],
          tagIds: [ids.tagIds.pescatarian],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.cornbread,
        data: createDishDto({
          id: ids.dishIds.cornbread,
          uid,
          name: 'Cornbread',
          description: 'Made in the skillet with brown butter',
          type: 'side',
          link: 'https://cooking.nytimes.com/recipes/1016965-brown-butter-skillet-cornbread',
          menuIds: [ids.menuIds.menu],
          mealIds: [ids.mealIds.southernClassic],
          tagIds: [ids.tagIds.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.enchiladas,
        data: createDishDto({
          id: ids.dishIds.enchiladas,
          uid,
          name: 'Enchiladas',
          link: 'https://cooking.nytimes.com/recipes/1018152-enchiladas-con-carne',
          menuIds: [ids.menuIds.menu],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.friedChicken,
        data: createDishDto({
          id: ids.dishIds.friedChicken,
          uid,
          name: 'Fried Chicken',
          link: 'https://cooking.nytimes.com/recipes/1018219-buttermilk-fried-chicken',
          menuIds: [ids.menuIds.menu],
          mealIds: [ids.mealIds.southernClassic],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.greekSalad,
        data: createDishDto({
          id: ids.dishIds.greekSalad,
          uid,
          name: 'Greek Salad',
          tagIds: [ids.tagIds.vegetarian],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.huevosRotos,
        data: createDishDto({
          id: ids.dishIds.huevosRotos,
          uid,
          name: 'Huevos Rotos',
          link: 'https://cooking.nytimes.com/recipes/1020055-huevos-rotos-broken-eggs',
          ingredientIds: [
            ids.ingredientIds.eggs,
            ids.ingredientIds.garlic,
            ids.ingredientIds.oliveOil,
            ids.ingredientIds.onion,
            ids.ingredientIds.paprika,
            ids.ingredientIds.pepper,
            ids.ingredientIds.potato,
            ids.ingredientIds.salt,
          ],
          tagIds: [ids.tagIds.vegetarian],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.macAndCheese,
        data: createDishDto({
          id: ids.dishIds.macAndCheese,
          uid,
          name: 'Macaroni and Cheese',
          description: 'Delicious baked noodles from the USA',
          type: 'side',
          link: 'https://cooking.nytimes.com/recipes/1015825-creamy-macaroni-and-cheese',
          menuIds: [ids.menuIds.menu],
          mealIds: [ids.mealIds.southernClassic],
          tagIds: [ids.tagIds.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.misoSoup,
        data: createDishDto({
          id: ids.dishIds.misoSoup,
          uid,
          name: 'Miso Soup',
          type: 'side',
          menuIds: [ids.menuIds.menu],
          mealIds: [ids.mealIds.sushiDinner],
          tagIds: [ids.tagIds.vegan, ids.tagIds.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.pizza,
        data: createDishDto({
          id: ids.dishIds.pizza,
          uid,
          name: 'Pizza',
          description: 'Delicious round vessel from Italy',
          link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
          menuIds: [ids.menuIds.menu],
          tagIds: [ids.tagIds.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.redLentilSoup,
        data: createDishDto({
          id: ids.dishIds.redLentilSoup,
          uid,
          name: 'Red Lentil Soup',
          link: 'https://cooking.nytimes.com/recipes/1016062-red-lentil-soup-with-lemon',
          menuIds: [ids.menuIds.menu],
          tagIds: [ids.tagIds.vegan, ids.tagIds.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.roastedCauliflower,
        data: createDishDto({
          id: ids.dishIds.roastedCauliflower,
          uid,
          name: 'Roasted Cauliflower',
          link: 'https://cooking.nytimes.com/recipes/7588-roasted-cauliflower',
          type: 'side',
          tagIds: [ids.tagIds.easy, ids.tagIds.vegan, ids.tagIds.vegetarian],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.salmonBurgers,
        data: createDishDto({
          id: ids.dishIds.salmonBurgers,
          uid,
          name: 'Salmon Burgers',
          link: 'https://cooking.nytimes.com/recipes/7131-salmon-burgers',
          menuIds: [ids.menuIds.menu],
          tagIds: [ids.tagIds.pescatarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.sushi,
        data: createDishDto({
          id: ids.dishIds.sushi,
          uid,
          name: 'Sushi',
          description: 'Delicious tiny vessels from Japan',
          menuIds: [ids.menuIds.menu],
          mealIds: [ids.mealIds.sushiDinner],
          tagIds: [ids.tagIds.pescatarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.sweetPotatoFries,
        data: createDishDto({
          id: ids.dishIds.sweetPotatoFries,
          uid,
          name: 'Sweet Potato Fries',
          type: 'side',
          menuIds: [ids.menuIds.menu],
          tagIds: [ids.tagIds.vegan, ids.tagIds.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.tiramisu,
        data: createDishDto({
          id: ids.dishIds.tiramisu,
          uid,
          name: 'Tiramisu',
          description: 'Delicious coffee-flavored Italian cake',
          link: 'https://cooking.nytimes.com/recipes/1018684-classic-tiramisu',
          type: 'dessert',
          menuIds: [ids.menuIds.menu],
          tagIds: [],
          usages: 2,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.dishIds.thaiCurry,
        data: createDishDto({
          id: ids.dishIds.thaiCurry,
          uid,
          name: 'Thai Curry',
          description: 'Delicious fragrant stew from Thailand',
          link: 'https://cooking.nytimes.com/recipes/1015694-vegan-thai-curry-vegetables',
          menuIds: [ids.menuIds.menu],
          tagIds: [ids.tagIds.easy, ids.tagIds.vegan, ids.tagIds.vegetarian],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.ingredientTypes,
        id: ids.ingredientTypesIds.produce,
        data: createIngredientTypeDto({
          id: ids.ingredientTypesIds.produce,
          uid,
          name: 'Produce',
          ingredientIds: [
            ids.ingredientIds.garlic,
            ids.ingredientIds.onion,
            ids.ingredientIds.potato,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.ingredientTypes,
        id: ids.ingredientTypesIds.refrigerated,
        data: createIngredientTypeDto({
          id: ids.ingredientTypesIds.refrigerated,
          uid,
          name: 'Refrigerated',
          ingredientIds: [ids.ingredientIds.eggs, ids.ingredientIds.oliveOil],
        }),
      })
      .set({
        endpoint: Endpoint.ingredientTypes,
        id: ids.ingredientTypesIds.spice,
        data: createIngredientTypeDto({
          id: ids.ingredientTypesIds.spice,
          uid,
          name: 'Spice',
          ingredientIds: [
            ids.ingredientIds.paprika,
            ids.ingredientIds.pepper,
            ids.ingredientIds.salt,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredientIds.eggs,
        data: createIngredientDto({
          id: ids.ingredientIds.eggs,
          uid,
          name: 'Eggs',
          typeId: ids.ingredientTypesIds.refrigerated,
          dishIds: [ids.dishIds.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredientIds.garlic,
        data: createIngredientDto({
          id: ids.ingredientIds.garlic,
          uid,
          name: 'Garlic',
          typeId: ids.ingredientTypesIds.produce,
          dishIds: [ids.ingredientTypesIds.refrigerated],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredientIds.oliveOil,
        data: createIngredientDto({
          id: ids.ingredientIds.oliveOil,
          uid,
          name: 'Olive Oil',
          typeId: ids.ingredientTypesIds.refrigerated,
          dishIds: [ids.dishIds.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredientIds.onion,
        data: createIngredientDto({
          id: ids.ingredientIds.onion,
          uid,
          name: 'Onion',
          typeId: ids.ingredientTypesIds.produce,
          dishIds: [ids.ingredientTypesIds.refrigerated],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredientIds.paprika,
        data: createIngredientDto({
          id: ids.ingredientIds.paprika,
          uid,
          name: 'Paprika',
          typeId: ids.ingredientTypesIds.spice,
          dishIds: [ids.dishIds.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredientIds.pepper,
        data: createIngredientDto({
          id: ids.ingredientIds.pepper,
          uid,
          name: 'Pepper',
          typeId: ids.ingredientTypesIds.spice,
          dishIds: [ids.dishIds.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredientIds.potato,
        data: createIngredientDto({
          id: ids.ingredientIds.potato,
          uid,
          name: 'Potato',
          typeId: ids.ingredientTypesIds.produce,
          dishIds: [ids.ingredientTypesIds.refrigerated],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.ingredientIds.salt,
        data: createIngredientDto({
          id: ids.ingredientIds.salt,
          uid,
          name: 'Salt',
          typeId: ids.ingredientTypesIds.spice,
          dishIds: [ids.dishIds.huevosRotos],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.tagIds.easy,
        data: createTagDto({
          id: ids.tagIds.easy,
          uid,
          name: 'Easy',
          dishIds: [ids.dishIds.roastedCauliflower, ids.dishIds.thaiCurry],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.tagIds.pescatarian,
        data: createTagDto({
          id: ids.tagIds.pescatarian,
          uid,
          name: 'Pescatarian',
          dishIds: [ids.dishIds.salmonBurgers, ids.dishIds.sushi],
          mealIds: [ids.mealIds.sushiDinner],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.tagIds.vegan,
        data: createTagDto({
          id: ids.tagIds.vegan,
          uid,
          name: 'Vegan',
          dishIds: [
            ids.dishIds.misoSoup,
            ids.dishIds.redLentilSoup,
            ids.dishIds.roastedCauliflower,
            ids.dishIds.sweetPotatoFries,
            ids.dishIds.thaiCurry,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.tagIds.vegetarian,
        data: createTagDto({
          id: ids.tagIds.vegetarian,
          uid,
          name: 'Vegetarian',
          dishIds: [
            ids.dishIds.cornbread,
            ids.dishIds.greekSalad,
            ids.dishIds.huevosRotos,
            ids.dishIds.macAndCheese,
            ids.dishIds.misoSoup,
            ids.dishIds.pizza,
            ids.dishIds.redLentilSoup,
            ids.dishIds.roastedCauliflower,
            ids.dishIds.sweetPotatoFries,
            ids.dishIds.thaiCurry,
          ],
        }),
      });
    await batch.commit();
    return ids.menuIds.menu;
  }
}
