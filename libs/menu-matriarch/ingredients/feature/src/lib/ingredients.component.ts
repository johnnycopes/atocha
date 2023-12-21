import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import {
  IngredientService,
  IngredientTypeService,
} from '@atocha/menu-matriarch/ingredients/data-access';
import { UserService } from '@atocha/menu-matriarch/settings/data-access';
import { InlineNameEditComponent } from '@atocha/menu-matriarch/shared/ui-domain';
import { SectionComponent } from '@atocha/menu-matriarch/shared/ui-generic';
import { Ingredient, IngredientType } from '@atocha/menu-matriarch/shared/util';
import {
  TypeRename,
  IngredientsBoardComponent,
} from './ingredients-board/ingredients-board.component';
import {
  IngredientAdd,
  IngredientMove,
  IngredientRename,
} from './ingredients-board/ingredients-board-column/ingredients-board-column.component';

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    IngredientsBoardComponent,
    InlineNameEditComponent,
    SectionComponent,
  ],
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsComponent {
  addingSubject = new BehaviorSubject<boolean>(false);

  vm$ = combineLatest([
    this._userService.getPreferences(),
    this._ingredientTypeService.getAll(),
    this.addingSubject.asObservable(),
  ]).pipe(
    map(([preferences, ingredientTypes, adding]) => {
      // Bail out if user's columnIds and ingredientTypes aren't in sync
      if (preferences?.ingredientTypeOrder.length !== ingredientTypes.length) {
        return;
      }

      const orderedTypeIds = preferences?.ingredientTypeOrder ?? [];
      const typesKeyedById = ingredientTypes.reduce<
        Record<string, IngredientType>
      >((record, type) => {
        record[type.id] = type;
        return record;
      }, {});

      return {
        totalIngredients: ingredientTypes.reduce(
          (total, { ingredients }) => total + ingredients.length,
          0
        ),
        types: orderedTypeIds.map((id) => typesKeyedById[id]),
        adding,
      };
    })
  );

  constructor(
    private _ingredientService: IngredientService,
    private _ingredientTypeService: IngredientTypeService,
    private _userService: UserService
  ) {}

  onTypeAdd(name: string): void {
    this._ingredientTypeService.create({ name }).subscribe();
  }

  onTypeMove(typeIds: string[]): void {
    this._userService
      .updatePreferences({ ingredientTypeOrder: typeIds })
      .subscribe();
  }

  async onTypeRename({ type, name }: TypeRename) {
    this._ingredientTypeService.update(type, {
      name,
    });
  }

  async onTypeDelete(type: IngredientType): Promise<void> {
    this._ingredientTypeService.delete(type);
  }

  onIngredientAdd({ name, typeId }: IngredientAdd) {
    this._ingredientService
      .create({
        name,
        typeId,
        dishIds: [],
      })
      .subscribe();
  }

  async onIngredientMove({
    ingredient,
    typeId,
  }: IngredientMove): Promise<void> {
    this._ingredientService.update(ingredient, {
      ...ingredient,
      typeId,
    });
  }

  onIngredientRename({ ingredient, name }: IngredientRename): void {
    this._ingredientService.update(ingredient, {
      ...ingredient,
      name,
    });
  }

  async onIngredientDelete(ingredient: Ingredient): Promise<void> {
    this._ingredientService.delete(ingredient);
  }
}
