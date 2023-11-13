import { createDishData } from './data/dish-data';
import { createIngredientData } from './data/ingredient-data';
import { createIngredientTypeData } from './data/ingredient-type-data';
import { createMealData } from './data/meal-data';
import { createMenuData } from './data/menu-data';
import { createTagData } from './data/tag-data';
import { createUserData } from './data/user-data';
import { SeedDataIds } from './data/seed-data-ids';

export class SeedDataDtos {
  private readonly _ids = new SeedDataIds(this._createId);

  protected readonly userDto = createUserData({
    uid: this._uid,
    name: this._name,
    email: this._email,
    ids: this._ids,
  });

  protected readonly menuDtos = createMenuData(this._uid, this._ids);

  protected readonly mealDtos = createMealData(this._uid, this._ids);

  protected readonly dishDtos = createDishData(this._uid, this._ids);

  protected readonly ingredientTypeDtos = createIngredientTypeData(
    this._uid,
    this._ids
  );

  protected readonly ingredientDtos = createIngredientData(
    this._uid,
    this._ids
  );

  protected readonly _tagDtos = createTagData(this._uid, this._ids);

  constructor(
    protected _uid: string,
    private _name: string,
    private _email: string,
    private _createId: () => string
  ) {}
}
