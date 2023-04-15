import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

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
export class MealEditFormComponent implements OnInit, OnDestroy {
  @Input() data: AppData | undefined;
  @Output() dishClick = new EventEmitter<string>();
  @Output() save = new EventEmitter<MealDetails>();

  tagsModel: TagModel[] = [];
  dishes: Dish[] = [];
  form: MealEditForm | undefined;

  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    if (!this.data) {
      return;
    }

    this.form = new MealEditForm(this.data);

    this.form.dishes$
      .pipe(takeUntil(this._destroy$))
      .subscribe((dishes) => (this.dishes = dishes));

    this.tagsModel = this.data.allTags.map<TagModel>((tag) => ({
      ...tag,
      checked: !!this.data?.meal?.tags.find((mealTag) => mealTag.id === tag.id),
    }));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onDishClick(id: string): void {
    this.dishClick.emit(id);
  }

  onSave(): void {
    if (!this.form) {
      return;
    }

    const { name, description, dishIds, tagIds } = this.form.getRawValue();

    this.save.emit({
      name,
      description,
      dishIds: recordToArray<string>(dishIds),
      tagIds: recordToArray<string>(tagIds),
    });
  }
}
