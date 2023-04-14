import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  AutofocusDirective,
  ButtonComponent,
  CheckboxComponent,
} from '@atocha/core/ui';
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
import { Dish, Orientation, TagModel } from '@atocha/menu-matriarch/util';
import { MealEditForm } from './meal-edit-form';

export interface MealEditDetails {
  name: string;
  description: string;
  tags: TagModel[];
  dishes: Dish[];
  dishesModel: string[];
  fallbackText: string;
  orientation: Orientation;
}

export interface MealEditModel {
  name: string;
  description: string;
  tags: TagModel[];
  dishesModel: string[];
}

type FormDishes = Record<string, boolean>;

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
export class MealEditFormComponent {
  @Input() vm: MealEditDetails | undefined;
  @Output() dishClick = new EventEmitter<string>();
  @Output() dishesChange = new EventEmitter<FormDishes>();
  @Output() save = new EventEmitter<NgForm>();

  reactiveForm = new MealEditForm({
    name: '',
    description: '',
    dishesModel: [],
    tags: [],
  });

  onDishClick(id: string): void {
    this.dishClick.emit(id);
  }

  onDishChange(dishesModel: FormDishes): void {
    this.dishesChange.emit(dishesModel);
  }

  onSave(form: NgForm): void {
    this.save.emit(form);
  }
}
