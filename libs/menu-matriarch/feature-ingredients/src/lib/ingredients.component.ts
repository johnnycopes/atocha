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
import { Ingredient, IngredientType } from '@atocha/menu-matriarch/util';
import {
  ColumnRename,
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

      const columnIds = preferences?.ingredientTypeOrder ?? [];
      const ingredientTypesKeyedById = ingredientTypes.reduce<
        Record<string, IngredientType>
      >((record, type) => {
        record[type.id] = type;
        return record;
      }, {});

      return {
        total: ingredientTypes.reduce(
          (total, { ingredients }) => total + ingredients.length,
          0
        ),
        columns: columnIds.map((id) => ingredientTypesKeyedById[id]),
        adding,
      };
    })
  );

  constructor(
    private _ingredientService: IngredientService,
    private _ingredientTypeService: IngredientTypeService,
    private _userService: UserService
  ) {}

  onColumnAdd(name: string): void {
    this._ingredientTypeService.createIngredientType({ name }).subscribe();
  }

  onColumnMove(columns: string[]): void {
    this._userService
      .updatePreferences({ ingredientTypeOrder: columns })
      .subscribe();
  }

  async onColumnRename({ column, name }: ColumnRename) {
    this._ingredientTypeService.updateIngredientType(column, {
      name,
    });
  }

  async onColumnDelete(column: IngredientType): Promise<void> {
    this._ingredientTypeService.deleteIngredientType(column);
  }

  onIngredientAdd({ ingredientName, columnId }: IngredientAdd) {
    this._ingredientService
      .createIngredient({
        name: ingredientName,
        typeId: columnId,
        dishIds: [],
      })
      .subscribe();
  }

  async onIngredientMove({
    ingredient,
    columnId,
  }: IngredientMove): Promise<void> {
    this._ingredientService.updateIngredient(ingredient, {
      ...ingredient,
      typeId: columnId,
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
