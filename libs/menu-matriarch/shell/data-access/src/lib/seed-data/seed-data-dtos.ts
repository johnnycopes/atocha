import {
  createDishDto,
  createIngredientDto,
  createIngredientTypeDto,
  createMealDto,
  createMenuDto,
  createTagDto,
  createUserDto,
} from '@atocha/menu-matriarch/shared/data-access-dtos';
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

  protected readonly userDto = createUserDto(
    createUserData({
      uid: this._uid,
      name: this._name,
      email: this._email,
      ids: this._ids,
    })
  );

  protected readonly menuDtos = this._mapDataToDtos(
    createMenuData(this._uid, this._ids),
    createMenuDto
  );

  protected readonly mealDtos = this._mapDataToDtos(
    createMealData(this._uid, this._ids),
    createMealDto
  );

  protected readonly dishDtos = this._mapDataToDtos(
    createDishData(this._uid, this._ids),
    createDishDto
  );

  protected readonly ingredientTypeDtos = this._mapDataToDtos(
    createIngredientTypeData(this._uid, this._ids),
    createIngredientTypeDto
  );

  protected readonly ingredientDtos = this._mapDataToDtos(
    createIngredientData(this._uid, this._ids),
    createIngredientDto
  );

  protected readonly _tagDtos = this._mapDataToDtos(
    createTagData(this._uid, this._ids),
    createTagDto
  );

  constructor(
    protected _uid: string,
    private _name: string,
    private _email: string,
    private _createId: () => string
  ) {}

  private _mapDataToDtos<T>(
    data: Partial<T>[],
    createDto: (datum: Partial<T>) => T
  ): readonly T[] {
    return data.map(createDto);
  }
}
