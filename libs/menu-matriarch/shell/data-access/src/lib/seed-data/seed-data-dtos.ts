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

export class SeedDataDtos {
  private readonly _ids = new SeedDataIds(this._createId);

  protected readonly userDto = createUserDto({
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
        this._ids.ingredientTypesIds.produce,
        this._ids.ingredientTypesIds.refrigerated,
        this._ids.ingredientTypesIds.spice,
      ],
    },
  });

  protected readonly menuDtos = this._createDtos(createMenuDto, [
    {
      id: this._ids.menuIds.menu,
      uid: this._uid,
      name: 'Menu #1',
      contents: {
        Monday: [this._ids.dishIds.enchiladas],
        Tuesday: [this._ids.dishIds.sushi, this._ids.dishIds.misoSoup],
        Wednesday: [
          this._ids.dishIds.salmonBurgers,
          this._ids.dishIds.sweetPotatoFries,
        ],
        Thursday: [this._ids.dishIds.redLentilSoup],
        Friday: [this._ids.dishIds.pizza, this._ids.dishIds.tiramisu],
        Saturday: [this._ids.dishIds.thaiCurry, this._ids.dishIds.tiramisu],
        Sunday: [
          this._ids.dishIds.friedChicken,
          this._ids.dishIds.cornbread,
          this._ids.dishIds.macAndCheese,
        ],
      },
    },
  ]);

  protected readonly mealDtos = this._createDtos(createMealDto, [
    {
      id: this._ids.mealIds.southernClassic,
      uid: this._uid,
      name: 'Southern Classic',
      dishIds: [
        this._ids.dishIds.cornbread,
        this._ids.dishIds.friedChicken,
        this._ids.dishIds.macAndCheese,
      ],
    },
    {
      id: this._ids.mealIds.sushiDinner,
      uid: this._uid,
      name: 'Sushi Dinner',
      dishIds: [this._ids.dishIds.sushi, this._ids.dishIds.misoSoup],
      tagIds: [this._ids.tagIds.pescatarian],
    },
  ]);

  protected readonly dishDtos = this._createDtos(createDishDto, [
    {
      id: this._ids.dishIds.cornbread,
      uid: this._uid,
      name: 'Cornbread',
      description: 'Made in the skillet with brown butter',
      type: 'side',
      link: 'https://cooking.nytimes.com/recipes/1016965-brown-butter-skillet-cornbread',
      menuIds: [this._ids.menuIds.menu],
      mealIds: [this._ids.mealIds.southernClassic],
      tagIds: [this._ids.tagIds.vegetarian],
      usages: 1,
    },
    {
      id: this._ids.dishIds.enchiladas,
      uid: this._uid,
      name: 'Enchiladas',
      link: 'https://cooking.nytimes.com/recipes/1018152-enchiladas-con-carne',
      menuIds: [this._ids.menuIds.menu],
      usages: 1,
    },
    {
      id: this._ids.dishIds.friedChicken,
      uid: this._uid,
      name: 'Fried Chicken',
      link: 'https://cooking.nytimes.com/recipes/1018219-buttermilk-fried-chicken',
      menuIds: [this._ids.menuIds.menu],
      mealIds: [this._ids.mealIds.southernClassic],
      usages: 1,
    },
    {
      id: this._ids.dishIds.greekSalad,
      uid: this._uid,
      name: 'Greek Salad',
      tagIds: [this._ids.tagIds.vegetarian],
    },
    {
      id: this._ids.dishIds.huevosRotos,
      uid: this._uid,
      name: 'Huevos Rotos',
      link: 'https://cooking.nytimes.com/recipes/1020055-huevos-rotos-broken-eggs',
      ingredientIds: [
        this._ids.ingredientIds.eggs,
        this._ids.ingredientIds.garlic,
        this._ids.ingredientIds.oliveOil,
        this._ids.ingredientIds.onion,
        this._ids.ingredientIds.paprika,
        this._ids.ingredientIds.pepper,
        this._ids.ingredientIds.potato,
        this._ids.ingredientIds.salt,
      ],
      tagIds: [this._ids.tagIds.vegetarian],
    },
    {
      id: this._ids.dishIds.macAndCheese,
      uid: this._uid,
      name: 'Macaroni and Cheese',
      description: 'Delicious baked noodles from the USA',
      type: 'side',
      link: 'https://cooking.nytimes.com/recipes/1015825-creamy-macaroni-and-cheese',
      menuIds: [this._ids.menuIds.menu],
      mealIds: [this._ids.mealIds.southernClassic],
      tagIds: [this._ids.tagIds.vegetarian],
      usages: 1,
    },
    {
      id: this._ids.dishIds.misoSoup,
      uid: this._uid,
      name: 'Miso Soup',
      type: 'side',
      menuIds: [this._ids.menuIds.menu],
      mealIds: [this._ids.mealIds.sushiDinner],
      tagIds: [this._ids.tagIds.vegan, this._ids.tagIds.vegetarian],
      usages: 1,
    },
    {
      id: this._ids.dishIds.pizza,
      uid: this._uid,
      name: 'Pizza',
      description: 'Delicious round vessel from Italy',
      link: 'https://cooking.nytimes.com/guides/1-how-to-make-pizza',
      menuIds: [this._ids.menuIds.menu],
      tagIds: [this._ids.tagIds.vegetarian],
      usages: 1,
    },
    {
      id: this._ids.dishIds.redLentilSoup,
      uid: this._uid,
      name: 'Red Lentil Soup',
      link: 'https://cooking.nytimes.com/recipes/1016062-red-lentil-soup-with-lemon',
      menuIds: [this._ids.menuIds.menu],
      tagIds: [this._ids.tagIds.vegan, this._ids.tagIds.vegetarian],
      usages: 1,
    },
    {
      id: this._ids.dishIds.roastedCauliflower,
      uid: this._uid,
      name: 'Roasted Cauliflower',
      link: 'https://cooking.nytimes.com/recipes/7588-roasted-cauliflower',
      type: 'side',
      tagIds: [
        this._ids.tagIds.easy,
        this._ids.tagIds.vegan,
        this._ids.tagIds.vegetarian,
      ],
    },
    {
      id: this._ids.dishIds.salmonBurgers,
      uid: this._uid,
      name: 'Salmon Burgers',
      link: 'https://cooking.nytimes.com/recipes/7131-salmon-burgers',
      menuIds: [this._ids.menuIds.menu],
      tagIds: [this._ids.tagIds.pescatarian],
      usages: 1,
    },
    {
      id: this._ids.dishIds.sushi,
      uid: this._uid,
      name: 'Sushi',
      description: 'Delicious tiny vessels from Japan',
      menuIds: [this._ids.menuIds.menu],
      mealIds: [this._ids.mealIds.sushiDinner],
      tagIds: [this._ids.tagIds.pescatarian],
      usages: 1,
    },
    {
      id: this._ids.dishIds.sweetPotatoFries,
      uid: this._uid,
      name: 'Sweet Potato Fries',
      type: 'side',
      menuIds: [this._ids.menuIds.menu],
      tagIds: [this._ids.tagIds.vegan, this._ids.tagIds.vegetarian],
      usages: 1,
    },
    {
      id: this._ids.dishIds.tiramisu,
      uid: this._uid,
      name: 'Tiramisu',
      description: 'Delicious coffee-flavored Italian cake',
      link: 'https://cooking.nytimes.com/recipes/1018684-classic-tiramisu',
      type: 'dessert',
      menuIds: [this._ids.menuIds.menu],
      tagIds: [],
      usages: 2,
    },
    {
      id: this._ids.dishIds.thaiCurry,
      uid: this._uid,
      name: 'Thai Curry',
      description: 'Delicious fragrant stew from Thailand',
      link: 'https://cooking.nytimes.com/recipes/1015694-vegan-thai-curry-vegetables',
      menuIds: [this._ids.menuIds.menu],
      tagIds: [
        this._ids.tagIds.easy,
        this._ids.tagIds.vegan,
        this._ids.tagIds.vegetarian,
      ],
      usages: 1,
    },
  ]);

  protected readonly ingredientTypeDtos = this._createDtos(
    createIngredientTypeDto,
    [
      {
        id: this._ids.ingredientTypesIds.produce,
        uid: this._uid,
        name: 'Produce',
        ingredientIds: [
          this._ids.ingredientIds.garlic,
          this._ids.ingredientIds.onion,
          this._ids.ingredientIds.potato,
        ],
      },
      {
        id: this._ids.ingredientTypesIds.refrigerated,
        uid: this._uid,
        name: 'Refrigerated',
        ingredientIds: [
          this._ids.ingredientIds.eggs,
          this._ids.ingredientIds.oliveOil,
        ],
      },
      {
        id: this._ids.ingredientTypesIds.spice,
        uid: this._uid,
        name: 'Spice',
        ingredientIds: [
          this._ids.ingredientIds.paprika,
          this._ids.ingredientIds.pepper,
          this._ids.ingredientIds.salt,
        ],
      },
    ]
  );

  protected readonly ingredientDtos = this._createDtos(createIngredientDto, [
    {
      id: this._ids.ingredientIds.eggs,
      uid: this._uid,
      name: 'Eggs',
      typeId: this._ids.ingredientTypesIds.refrigerated,
      dishIds: [this._ids.dishIds.huevosRotos],
    },
    {
      id: this._ids.ingredientIds.garlic,
      uid: this._uid,
      name: 'Garlic',
      typeId: this._ids.ingredientTypesIds.produce,
      dishIds: [this._ids.ingredientTypesIds.refrigerated],
    },
    {
      id: this._ids.ingredientIds.oliveOil,
      uid: this._uid,
      name: 'Olive Oil',
      typeId: this._ids.ingredientTypesIds.refrigerated,
      dishIds: [this._ids.dishIds.huevosRotos],
    },
    {
      id: this._ids.ingredientIds.onion,
      uid: this._uid,
      name: 'Onion',
      typeId: this._ids.ingredientTypesIds.produce,
      dishIds: [this._ids.ingredientTypesIds.refrigerated],
    },
    {
      id: this._ids.ingredientIds.paprika,
      uid: this._uid,
      name: 'Paprika',
      typeId: this._ids.ingredientTypesIds.spice,
      dishIds: [this._ids.dishIds.huevosRotos],
    },
    {
      id: this._ids.ingredientIds.pepper,
      uid: this._uid,
      name: 'Pepper',
      typeId: this._ids.ingredientTypesIds.spice,
      dishIds: [this._ids.dishIds.huevosRotos],
    },
    {
      id: this._ids.ingredientIds.potato,
      uid: this._uid,
      name: 'Potato',
      typeId: this._ids.ingredientTypesIds.produce,
      dishIds: [this._ids.ingredientTypesIds.refrigerated],
    },
    {
      id: this._ids.ingredientIds.salt,
      uid: this._uid,
      name: 'Salt',
      typeId: this._ids.ingredientTypesIds.spice,
      dishIds: [this._ids.dishIds.huevosRotos],
    },
  ]);

  protected readonly _tagDtos = this._createDtos(createTagDto, [
    {
      id: this._ids.tagIds.easy,
      uid: this._uid,
      name: 'Easy',
      dishIds: [
        this._ids.dishIds.roastedCauliflower,
        this._ids.dishIds.thaiCurry,
      ],
    },
    {
      id: this._ids.tagIds.pescatarian,
      uid: this._uid,
      name: 'Pescatarian',
      dishIds: [this._ids.dishIds.salmonBurgers, this._ids.dishIds.sushi],
      mealIds: [this._ids.mealIds.sushiDinner],
    },
    {
      id: this._ids.tagIds.vegan,
      uid: this._uid,
      name: 'Vegan',
      dishIds: [
        this._ids.dishIds.misoSoup,
        this._ids.dishIds.redLentilSoup,
        this._ids.dishIds.roastedCauliflower,
        this._ids.dishIds.sweetPotatoFries,
        this._ids.dishIds.thaiCurry,
      ],
    },
    {
      id: this._ids.tagIds.vegetarian,
      uid: this._uid,
      name: 'Vegetarian',
      dishIds: [
        this._ids.dishIds.cornbread,
        this._ids.dishIds.greekSalad,
        this._ids.dishIds.huevosRotos,
        this._ids.dishIds.macAndCheese,
        this._ids.dishIds.misoSoup,
        this._ids.dishIds.pizza,
        this._ids.dishIds.redLentilSoup,
        this._ids.dishIds.roastedCauliflower,
        this._ids.dishIds.sweetPotatoFries,
        this._ids.dishIds.thaiCurry,
      ],
    },
  ]);

  constructor(
    protected _uid: string,
    private _name: string,
    private _email: string,
    private _createId: () => string
  ) {}

  private _createDtos<T>(
    createDto: (datum: Partial<T>) => T,
    data: Partial<T>[]
  ): readonly T[] {
    return data.map(createDto);
  }
}
