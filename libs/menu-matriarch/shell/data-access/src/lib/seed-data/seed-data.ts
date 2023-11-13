import { BatchSet } from '@atocha/firebase/data-access';
import { Endpoint } from '@atocha/menu-matriarch/shared/data-access-api';
import { SeedDataDtos } from './seed-data-dtos';

export class SeedData extends SeedDataDtos {
  user = this._mapDtosToBatchSets({
    endpoint: Endpoint.users,
    getId: () => this._uid,
    dtos: [this.userDto],
  })[0];

  menus = this._mapDtosToBatchSets({
    endpoint: Endpoint.menus,
    getId: ({ id }) => id,
    dtos: this.menuDtos,
  });

  meals = this._mapDtosToBatchSets({
    endpoint: Endpoint.meals,
    getId: ({ id }) => id,
    dtos: this.mealDtos,
  });

  dishes = this._mapDtosToBatchSets({
    endpoint: Endpoint.dishes,
    getId: ({ id }) => id,
    dtos: this.dishDtos,
  });

  ingredientTypes = this._mapDtosToBatchSets({
    endpoint: Endpoint.ingredientTypes,
    getId: ({ id }) => id,
    dtos: this.ingredientTypeDtos,
  });

  ingredients = this._mapDtosToBatchSets({
    endpoint: Endpoint.ingredients,
    getId: ({ id }) => id,
    dtos: this.ingredientDtos,
  });

  tags = this._mapDtosToBatchSets({
    endpoint: Endpoint.tags,
    getId: ({ id }) => id,
    dtos: this._tagDtos,
  });

  constructor(
    uid: string,
    name: string,
    email: string,
    createId: () => string
  ) {
    super(uid, name, email, createId);
  }

  private _mapDtosToBatchSets<T>({
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
