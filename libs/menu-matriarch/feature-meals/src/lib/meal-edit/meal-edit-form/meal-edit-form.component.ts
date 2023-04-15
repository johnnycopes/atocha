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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, map, startWith, takeUntil } from 'rxjs';

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
import { MealEditFormClass } from './meal-edit-form';

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
  private _destroy$ = new Subject<void>();

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.vm) {
      return;
    }

    this.reactiveForm = new MealEditFormClass(this.vm);

    this.reactiveForm.controls['dishIds'].valueChanges
      .pipe(
        startWith(this._mapDishesToFormRecord(this.vm.meal.dishes)),
        map((dishIds) =>
          this._mapFormRecordToDishes(this.vm?.allDishes ?? [], dishIds)
        ),
        takeUntil(this._destroy$)
      )
      .subscribe((dishes) => (this.dishes = dishes));

    this.tagsModel = this.vm.allTags.map<TagModel>((tag) => ({
      ...tag,
      checked: !!this.vm?.meal?.tags.find((mealTag) => mealTag.id === tag.id),
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
    const { name, description, dishIds, tagIds } =
      this.reactiveForm.getRawValue();

    this.save.emit({
      name,
      description,
      dishIds: recordToArray<string>(dishIds),
      tagIds: recordToArray<string>(tagIds),
    });
  }

  private _mapDishesToFormRecord(dishes: Dish[]): Record<string, boolean> {
    const record: Record<string, boolean> = {};

    for (const dish of dishes) {
      record[dish.id] = true;
    }

    return record;
  }

  private _mapFormRecordToDishes(
    allDishes: Dish[],
    formDishes: Partial<Record<string, boolean>>
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
