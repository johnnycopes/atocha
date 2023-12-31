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

import { DishSummaryComponent } from '@atocha/menu-matriarch/dishes/ui';
import {
  AutofocusDirective,
  ButtonComponent,
  CheckboxComponent,
} from '@atocha/core/ui';
import { MealData } from '@atocha/menu-matriarch/meals/data-access';
import { MealSummaryComponent } from '@atocha/menu-matriarch/meals/ui';
import {
  DishDefDirective,
  DishesListComponent,
} from '@atocha/menu-matriarch/shared/feature';
import {
  CardComponent,
  InputComponent,
  SectionComponent,
} from '@atocha/menu-matriarch/shared/ui';
import {
  DishModel,
  Meal,
  TagModel,
  UserPreferences,
  recordToArray,
} from '@atocha/menu-matriarch/shared/util';
import {
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/tags/ui';
import { MealEditForm } from './meal-edit-form';

export type MealConfig = Pick<Meal, 'name' | 'description'> &
  Pick<UserPreferences, 'emptyMealText' | 'mealOrientation'> & {
    tagModels: TagModel[];
    dishModels: DishModel[];
  };

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
  @Output() save = new EventEmitter<MealData>();

  form: MealEditForm | undefined;

  ngOnInit(): void {
    if (this.meal) {
      this.form = new MealEditForm(this.meal);
    }
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
