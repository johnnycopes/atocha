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
              ids.produceIngredientType,
              ids.refrigeratedIngredientType,
              ids.spiceIngredientType,
            ],
          },
        }),
      })
      .set({
        endpoint: Endpoint.menus,
        id: ids.menu,
        data: createMenuDto({
          id: ids.menu,
          uid,
          name: 'Menu #1',
          contents: {
            Monday: [ids.enchiladasDish],
            Tuesday: [ids.sushiDish, ids.misoSoupDish],
            Wednesday: [ids.salmonBurgersDish, ids.sweetPotatoFriesDish],
            Thursday: [ids.redLentilSoupDish],
            Friday: [ids.pizzaDish, ids.tiramisuDish],
            Saturday: [ids.thaiCurryDish, ids.tiramisuDish],
            Sunday: [
              ids.friedChickenDish,
              ids.cornbreadDish,
              ids.macAndCheeseDish,
            ],
          },
        }),
      })
      .set({
        endpoint: Endpoint.meals,
        id: ids.southernClassicMeal,
        data: createMealDto({
          id: ids.southernClassicMeal,
          uid,
          name: 'Southern Classic',
          dishIds: [
            ids.cornbreadDish,
            ids.friedChickenDish,
            ids.macAndCheeseDish,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.meals,
        id: ids.sushiDinnerMeal,
        data: createMealDto({
          id: ids.sushiDinnerMeal,
          uid,
          name: 'Sushi Dinner',
          dishIds: [ids.sushiDish, ids.misoSoupDish],
          tagIds: [ids.pescatarianTag],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.cornbreadDish,
        data: createDishDto({
          id: ids.cornbreadDish,
          uid,
          name: 'Cornbread',
          description: 'Made in the skillet with brown butter',
          type: 'side',
          link: 'https://cooking.nytimes.com/recipes/1016965-brown-butter-skillet-cornbread',
          menuIds: [ids.menu],
          mealIds: [ids.southernClassicMeal],
          tagIds: [ids.vegetarianTag],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.enchiladasDish,
        data: createDishDto({
          id: ids.enchiladasDish,
          uid,
          name: 'Enchiladas',
          link: 'https://cooking.nytimes.com/recipes/1018152-enchiladas-con-carne',
          menuIds: [ids.menu],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.friedChickenDish,
        data: createDishDto({
          id: ids.friedChickenDish,
          uid,
          name: 'Fried Chicken',
          link: 'https://cooking.nytimes.com/recipes/1018219-buttermilk-fried-chicken',
          menuIds: [ids.menu],
          mealIds: [ids.southernClassicMeal],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.greekSaladDish,
        data: createDishDto({
          id: ids.greekSaladDish,
          uid,
          name: 'Greek Salad',
          tagIds: [ids.vegetarianTag],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.huevosRotosDish,
        data: createDishDto({
          id: ids.huevosRotosDish,
          uid,
          name: 'Huevos Rotos',
          link: 'https://cooking.nytimes.com/recipes/1020055-huevos-rotos-broken-eggs',
          ingredientIds: [
            ids.eggsIngredient,
            ids.garlicIngredient,
            ids.oliveOilIngredient,
            ids.onionIngredient,
            ids.paprikaIngredient,
            ids.pepperIngredient,
            ids.potatoIngredient,
            ids.saltIngredient,
          ],
          tagIds: [ids.vegetarianTag],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.macAndCheeseDish,
        data: createDishDto({
          id: ids.macAndCheeseDish,
          uid,
          name: 'Macaroni and Cheese',
          description: 'Delicious baked noodles from the USA',
          type: 'side',
          link: 'https://cooking.nytimes.com/recipes/1015825-creamy-macaroni-and-cheese',
          menuIds: [ids.menu],
          mealIds: [ids.southernClassicMeal],
          tagIds: [ids.vegetarianTag],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.misoSoupDish,
        data: createDishDto({
          id: ids.misoSoupDish,
          uid,
          name: 'Miso Soup',
          type: 'side',
          menuIds: [ids.menu],
          mealIds: [ids.sushiDinnerMeal],
          tagIds: [ids.veganTag, ids.vegetarianTag],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.pizzaDish,
        data: createDishDto({
          id: ids.pizzaDish,
          uid,
          name: 'Pizza',
          description: 'Delicious round vessel from Italy',
          link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
          menuIds: [ids.menu],
          tagIds: [ids.vegetarianTag],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.redLentilSoupDish,
        data: createDishDto({
          id: ids.redLentilSoupDish,
          uid,
          name: 'Red Lentil Soup',
          link: 'https://cooking.nytimes.com/recipes/1016062-red-lentil-soup-with-lemon',
          menuIds: [ids.menu],
          tagIds: [ids.veganTag, ids.vegetarianTag],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.roastedCauliflowerDish,
        data: createDishDto({
          id: ids.roastedCauliflowerDish,
          uid,
          name: 'Roasted Cauliflower',
          link: 'https://cooking.nytimes.com/recipes/7588-roasted-cauliflower',
          type: 'side',
          tagIds: [ids.easyTag, ids.veganTag, ids.vegetarianTag],
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.salmonBurgersDish,
        data: createDishDto({
          id: ids.salmonBurgersDish,
          uid,
          name: 'Salmon Burgers',
          link: 'https://cooking.nytimes.com/recipes/7131-salmon-burgers',
          menuIds: [ids.menu],
          tagIds: [ids.pescatarianTag],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.sushiDish,
        data: createDishDto({
          id: ids.sushiDish,
          uid,
          name: 'Sushi',
          description: 'Delicious tiny vessels from Japan',
          menuIds: [ids.menu],
          mealIds: [ids.sushiDinnerMeal],
          tagIds: [ids.pescatarianTag],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.sweetPotatoFriesDish,
        data: createDishDto({
          id: ids.sweetPotatoFriesDish,
          uid,
          name: 'Sweet Potato Fries',
          type: 'side',
          menuIds: [ids.menu],
          tagIds: [ids.veganTag, ids.vegetarianTag],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.tiramisuDish,
        data: createDishDto({
          id: ids.tiramisuDish,
          uid,
          name: 'Tiramisu',
          description: 'Delicious coffee-flavored Italian cake',
          link: 'https://cooking.nytimes.com/recipes/1018684-classic-tiramisu',
          type: 'dessert',
          menuIds: [ids.menu],
          tagIds: [],
          usages: 2,
        }),
      })
      .set({
        endpoint: Endpoint.dishes,
        id: ids.thaiCurryDish,
        data: createDishDto({
          id: ids.thaiCurryDish,
          uid,
          name: 'Thai Curry',
          description: 'Delicious fragrant stew from Thailand',
          link: 'https://cooking.nytimes.com/recipes/1015694-vegan-thai-curry-vegetables',
          menuIds: [ids.menu],
          tagIds: [ids.easyTag, ids.veganTag, ids.vegetarianTag],
          usages: 1,
        }),
      })
      .set({
        endpoint: Endpoint.ingredientTypes,
        id: ids.produceIngredientType,
        data: createIngredientTypeDto({
          id: ids.produceIngredientType,
          uid,
          name: 'Produce',
          ingredientIds: [
            ids.garlicIngredient,
            ids.onionIngredient,
            ids.potatoIngredient,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.ingredientTypes,
        id: ids.refrigeratedIngredientType,
        data: createIngredientTypeDto({
          id: ids.refrigeratedIngredientType,
          uid,
          name: 'Refrigerated',
          ingredientIds: [ids.eggsIngredient, ids.oliveOilIngredient],
        }),
      })
      .set({
        endpoint: Endpoint.ingredientTypes,
        id: ids.spiceIngredientType,
        data: createIngredientTypeDto({
          id: ids.spiceIngredientType,
          uid,
          name: 'Spice',
          ingredientIds: [
            ids.paprikaIngredient,
            ids.pepperIngredient,
            ids.saltIngredient,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.eggsIngredient,
        data: createIngredientDto({
          id: ids.eggsIngredient,
          uid,
          name: 'Eggs',
          typeId: ids.refrigeratedIngredientType,
          dishIds: [ids.huevosRotosDish],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.garlicIngredient,
        data: createIngredientDto({
          id: ids.garlicIngredient,
          uid,
          name: 'Garlic',
          typeId: ids.produceIngredientType,
          dishIds: [ids.huevosRotosDish],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.oliveOilIngredient,
        data: createIngredientDto({
          id: ids.oliveOilIngredient,
          uid,
          name: 'Olive Oil',
          typeId: ids.refrigeratedIngredientType,
          dishIds: [ids.huevosRotosDish],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.onionIngredient,
        data: createIngredientDto({
          id: ids.onionIngredient,
          uid,
          name: 'Onion',
          typeId: ids.produceIngredientType,
          dishIds: [ids.huevosRotosDish],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.paprikaIngredient,
        data: createIngredientDto({
          id: ids.paprikaIngredient,
          uid,
          name: 'Paprika',
          typeId: ids.spiceIngredientType,
          dishIds: [ids.huevosRotosDish],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.pepperIngredient,
        data: createIngredientDto({
          id: ids.pepperIngredient,
          uid,
          name: 'Pepper',
          typeId: ids.spiceIngredientType,
          dishIds: [ids.huevosRotosDish],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.potatoIngredient,
        data: createIngredientDto({
          id: ids.potatoIngredient,
          uid,
          name: 'Potato',
          typeId: ids.produceIngredientType,
          dishIds: [ids.huevosRotosDish],
        }),
      })
      .set({
        endpoint: Endpoint.ingredients,
        id: ids.saltIngredient,
        data: createIngredientDto({
          id: ids.saltIngredient,
          uid,
          name: 'Salt',
          typeId: ids.spiceIngredientType,
          dishIds: [ids.huevosRotosDish],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.easyTag,
        data: createTagDto({
          id: ids.easyTag,
          uid,
          name: 'Easy',
          dishIds: [ids.roastedCauliflowerDish, ids.thaiCurryDish],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.pescatarianTag,
        data: createTagDto({
          id: ids.pescatarianTag,
          uid,
          name: 'Pescatarian',
          dishIds: [ids.salmonBurgersDish, ids.sushiDish],
          mealIds: [ids.sushiDinnerMeal],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.veganTag,
        data: createTagDto({
          id: ids.veganTag,
          uid,
          name: 'Vegan',
          dishIds: [
            ids.misoSoupDish,
            ids.redLentilSoupDish,
            ids.roastedCauliflowerDish,
            ids.sweetPotatoFriesDish,
            ids.thaiCurryDish,
          ],
        }),
      })
      .set({
        endpoint: Endpoint.tags,
        id: ids.vegetarianTag,
        data: createTagDto({
          id: ids.vegetarianTag,
          uid,
          name: 'Vegetarian',
          dishIds: [
            ids.cornbreadDish,
            ids.greekSaladDish,
            ids.huevosRotosDish,
            ids.macAndCheeseDish,
            ids.misoSoupDish,
            ids.pizzaDish,
            ids.redLentilSoupDish,
            ids.roastedCauliflowerDish,
            ids.sweetPotatoFriesDish,
            ids.thaiCurryDish,
          ],
        }),
      });
    await batch.commit();
    return ids.menu;
  }
}
