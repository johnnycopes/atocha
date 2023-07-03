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

export class SeedDataDtos extends SeedDataIds {
  protected readonly userDto: UserDto = createUserDto({
    uid: this.uid,
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
  });

  protected readonly menuDtos: readonly MenuDto[] = [
    createMenuDto({
      id: this.menuIds.menu,
      uid: this.uid,
      name: 'Menu #1',
      contents: {
        Monday: [this.dishIds.enchiladas],
        Tuesday: [this.dishIds.sushi, this.dishIds.misoSoup],
        Wednesday: [this.dishIds.salmonBurgers, this.dishIds.sweetPotatoFries],
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
  ];

  protected readonly mealDtos: readonly MealDto[] = [
    createMealDto({
      id: this.mealIds.southernClassic,
      uid: this.uid,
      name: 'Southern Classic',
      dishIds: [
        this.dishIds.cornbread,
        this.dishIds.friedChicken,
        this.dishIds.macAndCheese,
      ],
    }),
    createMealDto({
      id: this.mealIds.sushiDinner,
      uid: this.uid,
      name: 'Sushi Dinner',
      dishIds: [this.dishIds.sushi, this.dishIds.misoSoup],
      tagIds: [this.tagIds.pescatarian],
    }),
  ];

  protected readonly dishDtos: readonly DishDto[] = [
    createDishDto({
      id: this.dishIds.cornbread,
      uid: this.uid,
      name: 'Cornbread',
      description: 'Made in the skillet with brown butter',
      type: 'side',
      link: 'https://cooking.nytimes.com/recipes/1016965-brown-butter-skillet-cornbread',
      menuIds: [this.menuIds.menu],
      mealIds: [this.mealIds.southernClassic],
      tagIds: [this.tagIds.vegetarian],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.enchiladas,
      uid: this.uid,
      name: 'Enchiladas',
      link: 'https://cooking.nytimes.com/recipes/1018152-enchiladas-con-carne',
      menuIds: [this.menuIds.menu],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.friedChicken,
      uid: this.uid,
      name: 'Fried Chicken',
      link: 'https://cooking.nytimes.com/recipes/1018219-buttermilk-fried-chicken',
      menuIds: [this.menuIds.menu],
      mealIds: [this.mealIds.southernClassic],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.greekSalad,
      uid: this.uid,
      name: 'Greek Salad',
      tagIds: [this.tagIds.vegetarian],
    }),
    createDishDto({
      id: this.dishIds.huevosRotos,
      uid: this.uid,
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
    createDishDto({
      id: this.dishIds.macAndCheese,
      uid: this.uid,
      name: 'Macaroni and Cheese',
      description: 'Delicious baked noodles from the USA',
      type: 'side',
      link: 'https://cooking.nytimes.com/recipes/1015825-creamy-macaroni-and-cheese',
      menuIds: [this.menuIds.menu],
      mealIds: [this.mealIds.southernClassic],
      tagIds: [this.tagIds.vegetarian],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.misoSoup,
      uid: this.uid,
      name: 'Miso Soup',
      type: 'side',
      menuIds: [this.menuIds.menu],
      mealIds: [this.mealIds.sushiDinner],
      tagIds: [this.tagIds.vegan, this.tagIds.vegetarian],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.pizza,
      uid: this.uid,
      name: 'Pizza',
      description: 'Delicious round vessel from Italy',
      link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
      menuIds: [this.menuIds.menu],
      tagIds: [this.tagIds.vegetarian],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.redLentilSoup,
      uid: this.uid,
      name: 'Red Lentil Soup',
      link: 'https://cooking.nytimes.com/recipes/1016062-red-lentil-soup-with-lemon',
      menuIds: [this.menuIds.menu],
      tagIds: [this.tagIds.vegan, this.tagIds.vegetarian],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.roastedCauliflower,
      uid: this.uid,
      name: 'Roasted Cauliflower',
      link: 'https://cooking.nytimes.com/recipes/7588-roasted-cauliflower',
      type: 'side',
      tagIds: [this.tagIds.easy, this.tagIds.vegan, this.tagIds.vegetarian],
    }),
    createDishDto({
      id: this.dishIds.salmonBurgers,
      uid: this.uid,
      name: 'Salmon Burgers',
      link: 'https://cooking.nytimes.com/recipes/7131-salmon-burgers',
      menuIds: [this.menuIds.menu],
      tagIds: [this.tagIds.pescatarian],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.sushi,
      uid: this.uid,
      name: 'Sushi',
      description: 'Delicious tiny vessels from Japan',
      menuIds: [this.menuIds.menu],
      mealIds: [this.mealIds.sushiDinner],
      tagIds: [this.tagIds.pescatarian],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.sweetPotatoFries,
      uid: this.uid,
      name: 'Sweet Potato Fries',
      type: 'side',
      menuIds: [this.menuIds.menu],
      tagIds: [this.tagIds.vegan, this.tagIds.vegetarian],
      usages: 1,
    }),
    createDishDto({
      id: this.dishIds.tiramisu,
      uid: this.uid,
      name: 'Tiramisu',
      description: 'Delicious coffee-flavored Italian cake',
      link: 'https://cooking.nytimes.com/recipes/1018684-classic-tiramisu',
      type: 'dessert',
      menuIds: [this.menuIds.menu],
      tagIds: [],
      usages: 2,
    }),
    createDishDto({
      id: this.dishIds.thaiCurry,
      uid: this.uid,
      name: 'Thai Curry',
      description: 'Delicious fragrant stew from Thailand',
      link: 'https://cooking.nytimes.com/recipes/1015694-vegan-thai-curry-vegetables',
      menuIds: [this.menuIds.menu],
      tagIds: [this.tagIds.easy, this.tagIds.vegan, this.tagIds.vegetarian],
      usages: 1,
    }),
  ];

  protected readonly ingredientTypeDtos: readonly IngredientTypeDto[] = [
    createIngredientTypeDto({
      id: this.ingredientTypesIds.produce,
      uid: this.uid,
      name: 'Produce',
      ingredientIds: [
        this.ingredientIds.garlic,
        this.ingredientIds.onion,
        this.ingredientIds.potato,
      ],
    }),
    createIngredientTypeDto({
      id: this.ingredientTypesIds.refrigerated,
      uid: this.uid,
      name: 'Refrigerated',
      ingredientIds: [this.ingredientIds.eggs, this.ingredientIds.oliveOil],
    }),
    createIngredientTypeDto({
      id: this.ingredientTypesIds.spice,
      uid: this.uid,
      name: 'Spice',
      ingredientIds: [
        this.ingredientIds.paprika,
        this.ingredientIds.pepper,
        this.ingredientIds.salt,
      ],
    }),
  ];

  protected readonly ingredientDtos: readonly IngredientDto[] = [
    createIngredientDto({
      id: this.ingredientIds.eggs,
      uid: this.uid,
      name: 'Eggs',
      typeId: this.ingredientTypesIds.refrigerated,
      dishIds: [this.dishIds.huevosRotos],
    }),
    createIngredientDto({
      id: this.ingredientIds.garlic,
      uid: this.uid,
      name: 'Garlic',
      typeId: this.ingredientTypesIds.produce,
      dishIds: [this.ingredientTypesIds.refrigerated],
    }),
    createIngredientDto({
      id: this.ingredientIds.oliveOil,
      uid: this.uid,
      name: 'Olive Oil',
      typeId: this.ingredientTypesIds.refrigerated,
      dishIds: [this.dishIds.huevosRotos],
    }),
    createIngredientDto({
      id: this.ingredientIds.onion,
      uid: this.uid,
      name: 'Onion',
      typeId: this.ingredientTypesIds.produce,
      dishIds: [this.ingredientTypesIds.refrigerated],
    }),
    createIngredientDto({
      id: this.ingredientIds.paprika,
      uid: this.uid,
      name: 'Paprika',
      typeId: this.ingredientTypesIds.spice,
      dishIds: [this.dishIds.huevosRotos],
    }),
    createIngredientDto({
      id: this.ingredientIds.pepper,
      uid: this.uid,
      name: 'Pepper',
      typeId: this.ingredientTypesIds.spice,
      dishIds: [this.dishIds.huevosRotos],
    }),
    createIngredientDto({
      id: this.ingredientIds.potato,
      uid: this.uid,
      name: 'Potato',
      typeId: this.ingredientTypesIds.produce,
      dishIds: [this.ingredientTypesIds.refrigerated],
    }),
    createIngredientDto({
      id: this.ingredientIds.salt,
      uid: this.uid,
      name: 'Salt',
      typeId: this.ingredientTypesIds.spice,
      dishIds: [this.dishIds.huevosRotos],
    }),
  ];

  protected readonly _tagDtos: readonly TagDto[] = [
    createTagDto({
      id: this.tagIds.easy,
      uid: this.uid,
      name: 'Easy',
      dishIds: [this.dishIds.roastedCauliflower, this.dishIds.thaiCurry],
    }),
    createTagDto({
      id: this.tagIds.pescatarian,
      uid: this.uid,
      name: 'Pescatarian',
      dishIds: [this.dishIds.salmonBurgers, this.dishIds.sushi],
      mealIds: [this.mealIds.sushiDinner],
    }),
    createTagDto({
      id: this.tagIds.vegan,
      uid: this.uid,
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
      uid: this.uid,
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

  constructor(
    _createId: () => string,
    protected uid: string,
    private _name: string,
    private _email: string
  ) {
    super(_createId);
  }
}
