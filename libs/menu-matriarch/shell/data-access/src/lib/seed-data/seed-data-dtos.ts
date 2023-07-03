import {
  createDishDto,
  createIngredientDto,
  createIngredientTypeDto,
  createMealDto,
  createMenuDto,
  createTagDto,
  createUserDto,
} from '@atocha/menu-matriarch/shared/data-access-dtos';
import { createDishData } from './dish-data';
import { createMealData } from './meal-data';
import { createMenuData } from './menu-data';
import { createIngredientTypeData } from './ingredient-type-data';
import { createIngredientData } from './ingredient-data';
import { createTagData } from './tag-data';
import { createUserData } from './user-data';
import { SeedDataIds } from './seed-data-ids';

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

  protected readonly menuDtos = this._createDtos(
    createMenuData(this._uid, this._ids),
    createMenuDto
  );

  protected readonly mealDtos = this._createDtos(
    createMealData(this._uid, this._ids),
    createMealDto
  );

  protected readonly dishDtos = this._createDtos(
    createDishData(this._uid, this._ids),
    createDishDto
  );

  protected readonly ingredientTypeDtos = this._createDtos(
    createIngredientTypeData(this._uid, this._ids),
    createIngredientTypeDto
  );

  protected readonly ingredientDtos = this._createDtos(
    createIngredientData(this._uid, this._ids),
    createIngredientDto
  );

  protected readonly _tagDtos = this._createDtos(
    createTagData(this._uid, this._ids),
    createTagDto
  );

  constructor(
    protected _uid: string,
    private _name: string,
    private _email: string,
    private _createId: () => string
  ) {}

  private _createDtos<T>(
    data: Partial<T>[],
    createDto: (datum: Partial<T>) => T
  ): readonly T[] {
    return data.map(createDto);
  }
}
