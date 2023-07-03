import { BatchSet } from '@atocha/core/data-access';
import { Endpoint } from '@atocha/menu-matriarch/shared/data-access-api';
import {
  DishDto,
  IngredientDto,
  IngredientTypeDto,
  MealDto,
  MenuDto,
  TagDto,
  UserDto,
  createDishDto,
  createIngredientDto,
  createIngredientTypeDto,
  createMealDto,
  createMenuDto,
  createTagDto,
  createUserDto,
} from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataIds } from './seed-data-ids';

export class SeedData extends SeedDataIds {
  user: BatchSet<UserDto> = {
    endpoint: Endpoint.users,
    id: this._uid,
    data: createUserDto({
      uid: this._uid,
      name: this._name,
      email: this._email,
      preferences: {
        darkMode: false,
        dayNameDisplay: 'full',
        defaultMenuStartDay: 'Monday',
        emptyMealText: 'undecided',
        mealOrientation: 'vertical',
        ingredientTypeOrder: [
          this.ingredientTypesIds.produce,
          this.ingredientTypesIds.refrigerated,
          this.ingredientTypesIds.spice,
        ],
      },
    }),
  };

  menus: BatchSet<MenuDto>[] = [
    {
      endpoint: Endpoint.menus,
      id: this.menuIds.menu,
      data: createMenuDto({
        id: this.menuIds.menu,
        uid: this._uid,
        name: 'Menu #1',
        contents: {
          Monday: [this.dishIds.enchiladas],
          Tuesday: [this.dishIds.sushi, this.dishIds.misoSoup],
          Wednesday: [
            this.dishIds.salmonBurgers,
            this.dishIds.sweetPotatoFries,
          ],
          Thursday: [this.dishIds.redLentilSoup],
          Friday: [this.dishIds.pizza, this.dishIds.tiramisu],
          Saturday: [this.dishIds.thaiCurry, this.dishIds.tiramisu],
          Sunday: [
            this.dishIds.friedChicken,
            this.dishIds.cornbread,
            this.dishIds.macAndCheese,
          ],
        },
      }),
    },
  ];

  meals: BatchSet<MealDto>[] = [
    {
      endpoint: Endpoint.meals,
      id: this.mealIds.southernClassic,
      data: createMealDto({
        id: this.mealIds.southernClassic,
        uid: this._uid,
        name: 'Southern Classic',
        dishIds: [
          this.dishIds.cornbread,
          this.dishIds.friedChicken,
          this.dishIds.macAndCheese,
        ],
      }),
    },
    {
      endpoint: Endpoint.meals,
      id: this.mealIds.sushiDinner,
      data: createMealDto({
        id: this.mealIds.sushiDinner,
        uid: this._uid,
        name: 'Sushi Dinner',
        dishIds: [this.dishIds.sushi, this.dishIds.misoSoup],
        tagIds: [this.tagIds.pescatarian],
      }),
    },
  ];

  dishes: BatchSet<DishDto>[] = [
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.cornbread,
      data: createDishDto({
        id: this.dishIds.cornbread,
        uid: this._uid,
        name: 'Cornbread',
        description: 'Made in the skillet with brown butter',
        type: 'side',
        link: 'https://cooking.nytimes.com/recipes/1016965-brown-butter-skillet-cornbread',
        menuIds: [this.menuIds.menu],
        mealIds: [this.mealIds.southernClassic],
        tagIds: [this.tagIds.vegetarian],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.enchiladas,
      data: createDishDto({
        id: this.dishIds.enchiladas,
        uid: this._uid,
        name: 'Enchiladas',
        link: 'https://cooking.nytimes.com/recipes/1018152-enchiladas-con-carne',
        menuIds: [this.menuIds.menu],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.friedChicken,
      data: createDishDto({
        id: this.dishIds.friedChicken,
        uid: this._uid,
        name: 'Fried Chicken',
        link: 'https://cooking.nytimes.com/recipes/1018219-buttermilk-fried-chicken',
        menuIds: [this.menuIds.menu],
        mealIds: [this.mealIds.southernClassic],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.greekSalad,
      data: createDishDto({
        id: this.dishIds.greekSalad,
        uid: this._uid,
        name: 'Greek Salad',
        tagIds: [this.tagIds.vegetarian],
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.huevosRotos,
      data: createDishDto({
        id: this.dishIds.huevosRotos,
        uid: this._uid,
        name: 'Huevos Rotos',
        link: 'https://cooking.nytimes.com/recipes/1020055-huevos-rotos-broken-eggs',
        ingredientIds: [
          this.ingredientIds.eggs,
          this.ingredientIds.garlic,
          this.ingredientIds.oliveOil,
          this.ingredientIds.onion,
          this.ingredientIds.paprika,
          this.ingredientIds.pepper,
          this.ingredientIds.potato,
          this.ingredientIds.salt,
        ],
        tagIds: [this.tagIds.vegetarian],
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.macAndCheese,
      data: createDishDto({
        id: this.dishIds.macAndCheese,
        uid: this._uid,
        name: 'Macaroni and Cheese',
        description: 'Delicious baked noodles from the USA',
        type: 'side',
        link: 'https://cooking.nytimes.com/recipes/1015825-creamy-macaroni-and-cheese',
        menuIds: [this.menuIds.menu],
        mealIds: [this.mealIds.southernClassic],
        tagIds: [this.tagIds.vegetarian],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.misoSoup,
      data: createDishDto({
        id: this.dishIds.misoSoup,
        uid: this._uid,
        name: 'Miso Soup',
        type: 'side',
        menuIds: [this.menuIds.menu],
        mealIds: [this.mealIds.sushiDinner],
        tagIds: [this.tagIds.vegan, this.tagIds.vegetarian],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.pizza,
      data: createDishDto({
        id: this.dishIds.pizza,
        uid: this._uid,
        name: 'Pizza',
        description: 'Delicious round vessel from Italy',
        link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
        menuIds: [this.menuIds.menu],
        tagIds: [this.tagIds.vegetarian],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.redLentilSoup,
      data: createDishDto({
        id: this.dishIds.redLentilSoup,
        uid: this._uid,
        name: 'Red Lentil Soup',
        link: 'https://cooking.nytimes.com/recipes/1016062-red-lentil-soup-with-lemon',
        menuIds: [this.menuIds.menu],
        tagIds: [this.tagIds.vegan, this.tagIds.vegetarian],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.roastedCauliflower,
      data: createDishDto({
        id: this.dishIds.roastedCauliflower,
        uid: this._uid,
        name: 'Roasted Cauliflower',
        link: 'https://cooking.nytimes.com/recipes/7588-roasted-cauliflower',
        type: 'side',
        tagIds: [this.tagIds.easy, this.tagIds.vegan, this.tagIds.vegetarian],
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.salmonBurgers,
      data: createDishDto({
        id: this.dishIds.salmonBurgers,
        uid: this._uid,
        name: 'Salmon Burgers',
        link: 'https://cooking.nytimes.com/recipes/7131-salmon-burgers',
        menuIds: [this.menuIds.menu],
        tagIds: [this.tagIds.pescatarian],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.sushi,
      data: createDishDto({
        id: this.dishIds.sushi,
        uid: this._uid,
        name: 'Sushi',
        description: 'Delicious tiny vessels from Japan',
        menuIds: [this.menuIds.menu],
        mealIds: [this.mealIds.sushiDinner],
        tagIds: [this.tagIds.pescatarian],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.sweetPotatoFries,
      data: createDishDto({
        id: this.dishIds.sweetPotatoFries,
        uid: this._uid,
        name: 'Sweet Potato Fries',
        type: 'side',
        menuIds: [this.menuIds.menu],
        tagIds: [this.tagIds.vegan, this.tagIds.vegetarian],
        usages: 1,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.tiramisu,
      data: createDishDto({
        id: this.dishIds.tiramisu,
        uid: this._uid,
        name: 'Tiramisu',
        description: 'Delicious coffee-flavored Italian cake',
        link: 'https://cooking.nytimes.com/recipes/1018684-classic-tiramisu',
        type: 'dessert',
        menuIds: [this.menuIds.menu],
        tagIds: [],
        usages: 2,
      }),
    },
    {
      endpoint: Endpoint.dishes,
      id: this.dishIds.thaiCurry,
      data: createDishDto({
        id: this.dishIds.thaiCurry,
        uid: this._uid,
        name: 'Thai Curry',
        description: 'Delicious fragrant stew from Thailand',
        link: 'https://cooking.nytimes.com/recipes/1015694-vegan-thai-curry-vegetables',
        menuIds: [this.menuIds.menu],
        tagIds: [this.tagIds.easy, this.tagIds.vegan, this.tagIds.vegetarian],
        usages: 1,
      }),
    },
  ];

  ingredientTypes: BatchSet<IngredientTypeDto>[] = [
    {
      endpoint: Endpoint.ingredientTypes,
      id: this.ingredientTypesIds.produce,
      data: createIngredientTypeDto({
        id: this.ingredientTypesIds.produce,
        uid: this._uid,
        name: 'Produce',
        ingredientIds: [
          this.ingredientIds.garlic,
          this.ingredientIds.onion,
          this.ingredientIds.potato,
        ],
      }),
    },
    {
      endpoint: Endpoint.ingredientTypes,
      id: this.ingredientTypesIds.refrigerated,
      data: createIngredientTypeDto({
        id: this.ingredientTypesIds.refrigerated,
        uid: this._uid,
        name: 'Refrigerated',
        ingredientIds: [this.ingredientIds.eggs, this.ingredientIds.oliveOil],
      }),
    },
    {
      endpoint: Endpoint.ingredientTypes,
      id: this.ingredientTypesIds.spice,
      data: createIngredientTypeDto({
        id: this.ingredientTypesIds.spice,
        uid: this._uid,
        name: 'Spice',
        ingredientIds: [
          this.ingredientIds.paprika,
          this.ingredientIds.pepper,
          this.ingredientIds.salt,
        ],
      }),
    },
  ];

  ingredients: BatchSet<IngredientDto>[] = [
    {
      endpoint: Endpoint.ingredients,
      id: this.ingredientIds.eggs,
      data: createIngredientDto({
        id: this.ingredientIds.eggs,
        uid: this._uid,
        name: 'Eggs',
        typeId: this.ingredientTypesIds.refrigerated,
        dishIds: [this.dishIds.huevosRotos],
      }),
    },
    {
      endpoint: Endpoint.ingredients,
      id: this.ingredientIds.garlic,
      data: createIngredientDto({
        id: this.ingredientIds.garlic,
        uid: this._uid,
        name: 'Garlic',
        typeId: this.ingredientTypesIds.produce,
        dishIds: [this.ingredientTypesIds.refrigerated],
      }),
    },
    {
      endpoint: Endpoint.ingredients,
      id: this.ingredientIds.oliveOil,
      data: createIngredientDto({
        id: this.ingredientIds.oliveOil,
        uid: this._uid,
        name: 'Olive Oil',
        typeId: this.ingredientTypesIds.refrigerated,
        dishIds: [this.dishIds.huevosRotos],
      }),
    },
    {
      endpoint: Endpoint.ingredients,
      id: this.ingredientIds.onion,
      data: createIngredientDto({
        id: this.ingredientIds.onion,
        uid: this._uid,
        name: 'Onion',
        typeId: this.ingredientTypesIds.produce,
        dishIds: [this.ingredientTypesIds.refrigerated],
      }),
    },
    {
      endpoint: Endpoint.ingredients,
      id: this.ingredientIds.paprika,
      data: createIngredientDto({
        id: this.ingredientIds.paprika,
        uid: this._uid,
        name: 'Paprika',
        typeId: this.ingredientTypesIds.spice,
        dishIds: [this.dishIds.huevosRotos],
      }),
    },
    {
      endpoint: Endpoint.ingredients,
      id: this.ingredientIds.pepper,
      data: createIngredientDto({
        id: this.ingredientIds.pepper,
        uid: this._uid,
        name: 'Pepper',
        typeId: this.ingredientTypesIds.spice,
        dishIds: [this.dishIds.huevosRotos],
      }),
    },
    {
      endpoint: Endpoint.ingredients,
      id: this.ingredientIds.potato,
      data: createIngredientDto({
        id: this.ingredientIds.potato,
        uid: this._uid,
        name: 'Potato',
        typeId: this.ingredientTypesIds.produce,
        dishIds: [this.ingredientTypesIds.refrigerated],
      }),
    },
    {
      endpoint: Endpoint.ingredients,
      id: this.ingredientIds.salt,
      data: createIngredientDto({
        id: this.ingredientIds.salt,
        uid: this._uid,
        name: 'Salt',
        typeId: this.ingredientTypesIds.spice,
        dishIds: [this.dishIds.huevosRotos],
      }),
    },
  ];

  private _tagDtos: TagDto[] = [
    createTagDto({
      id: this.tagIds.easy,
      uid: this._uid,
      name: 'Easy',
      dishIds: [this.dishIds.roastedCauliflower, this.dishIds.thaiCurry],
    }),
    createTagDto({
      id: this.tagIds.pescatarian,
      uid: this._uid,
      name: 'Pescatarian',
      dishIds: [this.dishIds.salmonBurgers, this.dishIds.sushi],
      mealIds: [this.mealIds.sushiDinner],
    }),
    createTagDto({
      id: this.tagIds.vegan,
      uid: this._uid,
      name: 'Vegan',
      dishIds: [
        this.dishIds.misoSoup,
        this.dishIds.redLentilSoup,
        this.dishIds.roastedCauliflower,
        this.dishIds.sweetPotatoFries,
        this.dishIds.thaiCurry,
      ],
    }),
    createTagDto({
      id: this.tagIds.vegetarian,
      uid: this._uid,
      name: 'Vegetarian',
      dishIds: [
        this.dishIds.cornbread,
        this.dishIds.greekSalad,
        this.dishIds.huevosRotos,
        this.dishIds.macAndCheese,
        this.dishIds.misoSoup,
        this.dishIds.pizza,
        this.dishIds.redLentilSoup,
        this.dishIds.roastedCauliflower,
        this.dishIds.sweetPotatoFries,
        this.dishIds.thaiCurry,
      ],
    }),
  ];

  tags: BatchSet<TagDto>[] = this._generateBatchSets({
    endpoint: Endpoint.tags,
    getId: (dto) => dto.id,
    dtos: this._tagDtos,
  });

  constructor(
    _createId: () => string,
    private _uid: string,
    private _name: string,
    private _email: string
  ) {
    super(_createId);
  }

  private _generateBatchSets<T>({
    endpoint,
    getId,
    dtos,
  }: {
    endpoint: Endpoint;
    getId: (dto: T) => string;
    dtos: T[];
  }) {
    return dtos.map<BatchSet<T>>((dto) => ({
      endpoint,
      id: getId(dto),
      data: dto,
    }));
  }
}
