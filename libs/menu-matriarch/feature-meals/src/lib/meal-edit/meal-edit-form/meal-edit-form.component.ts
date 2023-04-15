import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';

import {
  AutofocusDirective,
  ButtonComponent,
  CheckboxComponent,
} from '@atocha/core/ui';
import { recordToArray } from '@atocha/core/util';
import {
  DishDefDirective,
  DishesListComponent,
} from '@atocha/menu-matriarch/feature-entities';
import {
  CardComponent,
  DishSummaryComponent,
  InputComponent,
  MealSummaryComponent,
  SectionComponent,
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/ui';
import {
  Dish,
  DishModel,
  Meal,
  Orientation,
  Tag,
  TagModel,
  UserPreferences,
} from '@atocha/menu-matriarch/util';
import { MealEditForm } from './meal-edit-form';

export interface AppData {
  meal: Meal;
  allTags: Tag[];
  allDishes: Dish[];
  fallbackText: string;
  orientation: Orientation;
}

export type MealConfig = Pick<Meal, 'name' | 'description'> &
  Pick<UserPreferences, 'emptyMealText' | 'mealOrientation'> & {
    tagsModel: TagModel[];
    dishesModel: DishModel[];
  };

export interface MealDetails {
  name: string;
  description: string;
  dishIds: string[];
  tagIds: string[];
}

@Component({
  standalone: true,
  selector: 'app-meal-edit-form',
  imports: [
    AutofocusDirective,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    CommonModule,
    DishDefDirective,
    DishesListComponent,
    DishSummaryComponent,
    FormsModule,
    InputComponent,
    MealSummaryComponent,
    ReactiveFormsModule,
    RouterLink,
    SectionComponent,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
  templateUrl: './meal-edit-form.component.html',
  styleUrls: ['./meal-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealEditFormComponent implements OnInit {
  @Input() meal: MealConfig | undefined;
  @Output() dishClick = new EventEmitter<string>();
  @Output() save = new EventEmitter<MealDetails>();

  form: MealEditForm | undefined;
  dishes$ = of<Dish[]>([]);

  ngOnInit(): void {
    if (!this.meal) {
      return;
    }

    this.form = new MealEditForm(this.meal);
    this.dishes$ = this.form.dishes$;
  }

  onDishClick(id: string): void {
    this.dishClick.emit(id);
  }

  onSave(): void {
    if (!this.form) {
      return;
    }

    const { name, description, dishesModel, tagsModel } =
      this.form.getRawValue();

    this.save.emit({
      name,
      description,
      dishIds: recordToArray<string>(dishesModel),
      tagIds: recordToArray<string>(tagsModel),
    });
  }
}
