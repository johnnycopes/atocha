import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import {
  IngredientService,
  IngredientTypeService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import { InlineNameEditComponent } from '@atocha/menu-matriarch/ui-domain';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
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
    this._ingredientTypeService.getIngredientTypes(),
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
    this._ingredientTypeService.createIngredientType({ name }).subscribe();
  }

  onTypeMove(typeIds: string[]): void {
    this._userService
      .updatePreferences({ ingredientTypeOrder: typeIds })
      .subscribe();
  }

  async onTypeRename({ type, name }: TypeRename) {
    this._ingredientTypeService.updateIngredientType(type, {
      name,
    });
  }

  async onTypeDelete(type: IngredientType): Promise<void> {
    this._ingredientTypeService.deleteIngredientType(type);
  }

  onIngredientAdd({ name, typeId }: IngredientAdd) {
    this._ingredientService
      .createIngredient({
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
    this._ingredientService.updateIngredient(ingredient, {
      ...ingredient,
      typeId,
    });
  }

  onIngredientRename({ ingredient, name }: IngredientRename): void {
    this._ingredientService.updateIngredient(ingredient, {
      ...ingredient,
      name,
    });
  }

  async onIngredientDelete(ingredient: Ingredient): Promise<void> {
    this._ingredientService.deleteIngredient(ingredient);
  }
}
