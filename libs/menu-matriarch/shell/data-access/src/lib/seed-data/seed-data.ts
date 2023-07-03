import { BatchSet } from '@atocha/core/data-access';
import { Endpoint } from '@atocha/menu-matriarch/shared/data-access-api';
import { UserDto } from '@atocha/menu-matriarch/shared/data-access-dtos';
import { SeedDataDtos } from './seed-data-dtos';

export class SeedData extends SeedDataDtos {
  user: BatchSet<UserDto> = {
    endpoint: Endpoint.users,
    id: this.uid,
    data: this.userDto,
  };

  menus = this._createBatchSets({
    endpoint: Endpoint.menus,
    getId: ({ id }) => id,
    dtos: this.menuDtos,
  });

  meals = this._createBatchSets({
    endpoint: Endpoint.meals,
    getId: ({ id }) => id,
    dtos: this.mealDtos,
  });

  dishes = this._createBatchSets({
    endpoint: Endpoint.dishes,
    getId: ({ id }) => id,
    dtos: this.dishDtos,
  });

  ingredientTypes = this._createBatchSets({
    endpoint: Endpoint.ingredientTypes,
    getId: ({ id }) => id,
    dtos: this.ingredientTypeDtos,
  });

  ingredients = this._createBatchSets({
    endpoint: Endpoint.ingredients,
    getId: ({ id }) => id,
    dtos: this.ingredientDtos,
  });

  tags = this._createBatchSets({
    endpoint: Endpoint.tags,
    getId: ({ id }) => id,
    dtos: this._tagDtos,
  });

  constructor(
    _createId: () => string,
    _uid: string,
    _name: string,
    _email: string
  ) {
    super(_createId, _uid, _name, _email);
  }

  private _createBatchSets<T>({
    endpoint,
    getId,
    dtos,
  }: {
    endpoint: Endpoint;
    getId: (dto: T) => string;
    dtos: readonly T[];
  }) {
    return dtos.map<BatchSet<T>>((dto) => ({
      endpoint,
      id: getId(dto),
      data: dto,
    }));
  }
}
