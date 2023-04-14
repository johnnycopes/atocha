import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
import {
  Dish,
  Meal,
  Orientation,
  Tag,
  TagModel,
} from '@atocha/menu-matriarch/util';
import { MealEditForm } from './meal-edit-form';

export interface MealEditDetails {
  meal: Meal;
  allTags: Tag[];
  allDishes: Dish[];
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
export class MealEditFormComponent implements OnChanges {
  @Input() vm: MealEditDetails | undefined;
  @Output() dishClick = new EventEmitter<string>();
  @Output() save = new EventEmitter<NgForm>();
  dishesModel: string[] = [];
  tagsModel: TagModel[] = [];
  dishes: Dish[] = [];

  reactiveForm = new MealEditForm({
    name: '',
    description: '',
    dishesModel: [],
    tags: [],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.vm) {
      return;
    }

    this.dishesModel = this.vm.meal.dishes.map((dish) => dish.id);
    this.dishes = this.vm.meal.dishes;

    this.tagsModel = this.vm.allTags.map<TagModel>((tag) => ({
      ...tag,
      checked: !!this.vm?.meal?.tags.find((mealTag) => mealTag.id === tag.id),
    }));
  }

  onDishClick(id: string): void {
    this.dishClick.emit(id);
  }

  onDishChange(dishesModel: FormDishes): void {
    // this.dishesChange.emit(dishesModel);
    if (this.vm?.allDishes) {
      this.dishes = this._transformFormDishes(this.vm?.allDishes, dishesModel);
    }
  }

  onSave(form: NgForm): void {
    this.save.emit(form);
  }

  private _transformFormDishes(
    allDishes: Dish[],
    formDishes: Record<string, boolean>
  ): Dish[] {
    const dishes: Dish[] = [];

    for (const dishId in formDishes) {
      if (formDishes[dishId]) {
        const dish = allDishes.find(({ id }) => id === dishId);
        if (dish) {
          dishes.push(dish);
        }
      }
    }

    return dishes;
  }
}
