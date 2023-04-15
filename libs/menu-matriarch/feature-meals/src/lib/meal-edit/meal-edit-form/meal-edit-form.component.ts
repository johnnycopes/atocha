import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  Meal,
  Orientation,
  Tag,
  TagModel,
} from '@atocha/menu-matriarch/util';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

export interface MealEditDetails {
  meal: Meal;
  allTags: Tag[];
  allDishes: Dish[];
  fallbackText: string;
  orientation: Orientation;
}

export interface MealEditForm {
  name: FormControl<string>;
  description: FormControl<string>;
  dishIds: FormGroup<Record<string, FormControl<boolean>>>;
  tagIds: FormGroup<Record<string, FormControl<boolean>>>;
}

export interface MealEditFormOutput {
  name: string;
  description: string;
  dishIds: string[];
  tagIds: string[];
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
export class MealEditFormComponent implements OnInit {
  @Input() vm: MealEditDetails | undefined;
  @Output() dishClick = new EventEmitter<string>();
  @Output() save = new EventEmitter<MealEditFormOutput>();
  tagsModel: TagModel[] = [];
  dishes: Dish[] = [];

  reactiveForm = this._fb.nonNullable.group<MealEditForm>({
    name: this._fb.nonNullable.control(''),
    description: this._fb.nonNullable.control(''),
    dishIds: this._fb.nonNullable.group({}),
    tagIds: this._fb.nonNullable.group({}),
  });

  dishes$ = new BehaviorSubject<Dish[]>([]);

  constructor(private _fb: FormBuilder, private _cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.vm) {
      return;
    }

    const { name, description, dishes, tags } = this.vm.meal;

    const dishIds = dishes.map(({ id }) => id);
    const tagIds = tags.map(({ id }) => id);

    this.reactiveForm = this._fb.nonNullable.group({
      name: this._fb.nonNullable.control(name),
      description: this._fb.nonNullable.control(description),
      dishIds: this._fb.nonNullable.group(
        this.vm.allDishes.reduce<Record<string, FormControl<boolean>>>(
          (group, { id }) => {
            group[id] = this._fb.nonNullable.control(dishIds.includes(id));
            return group;
          },
          {}
        )
      ),
      tagIds: this._fb.nonNullable.group(
        this.vm.allTags.reduce<Record<string, FormControl<boolean>>>(
          (group, { id }) => {
            group[id] = this._fb.nonNullable.control(tagIds.includes(id));
            return group;
          },
          {}
        )
      ),
    });

    // this.reactiveForm
    //   .get('dishIds')
    //   ?.valueChanges.pipe(
    //     map((dishIds) =>
    //       this._transformFormDishes(this.vm?.allDishes ?? [], dishIds)
    //     )
    //   ) ?? of([]).subscribe((dishIds) => this.dishes$.next(dishIds));

    this.tagsModel = this.vm.allTags.map<TagModel>((tag) => ({
      ...tag,
      checked: !!this.vm?.meal?.tags.find((mealTag) => mealTag.id === tag.id),
    }));
  }

  onDishClick(id: string): void {
    this.dishClick.emit(id);
  }

  // onDishChange(dishesModel: FormDishes): void {
  //   if (this.vm?.allDishes) {
  //     this.dishes = this._transformFormDishes(this.vm.allDishes, dishesModel);
  //   }
  // }

  onSave(): void {
    const { name, description, dishIds, tagIds } =
      this.reactiveForm.getRawValue();

    this.save.emit({
      name,
      description,
      dishIds: recordToArray<string>(dishIds),
      tagIds: recordToArray<string>(tagIds),
    });
  }

  private _getDishes(allDishes: Dish[], dishIds: string[]): Dish[] {
    const dishes: Dish[] = [];

    for (const dishId in dishIds) {
      const dish = allDishes.find(({ id }) => id === dishId);
      if (dish) {
        dishes.push(dish);
      }
    }

    return dishes;
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
