import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { combineLatest, of, Subject } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  first,
  map,
  startWith,
  tap,
} from 'rxjs/operators';

import {
  AutofocusDirective,
  ButtonComponent,
  CheckboxComponent,
  trackBySelf,
} from '@atocha/core/ui';
import { recordToArray } from '@atocha/core/util';
import {
  DishService,
  MealService,
  TagService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import { Dish, TagModel, getDishTypes } from '@atocha/menu-matriarch/util';
import {
  CardComponent,
  DishSummaryComponent,
  InputComponent,
  MealSummaryComponent,
  SectionComponent,
  TagComponent,
  TagDefDirective,
  TagsListComponent,
  dishTrackByFn,
} from '@atocha/menu-matriarch/ui';
import { MenuMatriarchFeatureEntitiesModule } from '@atocha/menu-matriarch/feature-entities';

interface MealEditForm {
  name: string;
  description: string;
  dishIds: string[];
  tagIds: string[];
}

type FormDishes = Record<string, boolean>;

@Component({
  standalone: true,
  selector: 'app-meal-edit',
  imports: [
    AutofocusDirective,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    CommonModule,
    DishSummaryComponent,
    FormsModule,
    InputComponent,
    MealSummaryComponent,
    MenuMatriarchFeatureEntitiesModule,
    RouterModule,
    SectionComponent,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealEditComponent {
  private _routeId = this._route.snapshot.paramMap.get('id');
  private _dishIds = this._route.snapshot.queryParamMap.get('dishes');
  private _formDishes$ = new Subject<FormDishes | null>();
  _meal$ = this._routeId
    ? this._mealService.getMeal(this._routeId)
    : of(undefined);
  vm$ = combineLatest([
    this._meal$,
    this._dishService.getDishes(),
    this._tagService.getTags(),
    this._userService.getPreferences(),
    this._formDishes$.pipe(
      startWith(
        this._dishIds ? this._transformDishIds(JSON.parse(this._dishIds)) : null
      ),
      distinctUntilChanged()
    ),
  ]).pipe(
    map(([meal, allDishes, tags, preferences, formDishes]) => {
      const dishes = formDishes
        ? this._transformFormDishes(allDishes, formDishes)
        : meal?.dishes ?? [];
      const dishesModel = dishes.map((dish) => dish.id);
      const fallbackText = preferences?.emptyMealText ?? '';
      const orientation = preferences?.mealOrientation ?? 'horizontal';
      if (!meal) {
        return {
          name: '',
          description: '',
          tags: tags.map<TagModel>((tag) => ({
            ...tag,
            checked: false,
          })),
          dishes,
          dishesModel,
          fallbackText,
          orientation,
        };
      } else {
        return {
          ...meal,
          tags: tags.map<TagModel>((tag) => ({
            ...tag,
            checked: !!meal?.tags.find((mealTag) => mealTag.id === tag.id),
          })),
          dishes,
          dishesModel,
          fallbackText,
          orientation,
        };
      }
    })
  );
  readonly dishTypes = getDishTypes();
  readonly typeTrackByFn = trackBySelf;
  readonly dishTrackByFn = dishTrackByFn;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dishService: DishService,
    private _mealService: MealService,
    private _tagService: TagService,
    private _userService: UserService
  ) {}

  onDishClick(id: string): void {
    this._router.navigate(['dishes', id]);
  }

  onDishChange(dishesModel: FormDishes): void {
    this._formDishes$.next(dishesModel);
  }

  async onSave(form: NgForm): Promise<void> {
    const details: MealEditForm = {
      name: form.value.name,
      description: form.value.description,
      tagIds: recordToArray<string>(form.value.tags),
      dishIds: recordToArray<string>(form.value.dishes),
    };
    if (!this._routeId) {
      this._mealService
        .createMeal(details)
        .pipe(
          tap((newId) =>
            this._router.navigate(['..', newId], { relativeTo: this._route })
          )
        )
        .subscribe();
    } else {
      this._meal$
        .pipe(
          first(),
          concatMap((meal) => {
            if (meal) {
              return this._mealService.updateMeal(meal.id, details);
            } else {
              return of(undefined);
            }
          }),
          tap(() => this._router.navigate(['..'], { relativeTo: this._route }))
        )
        .subscribe();
    }
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

  private _transformDishIds(dishIds: string[]): Record<string, boolean> {
    return dishIds.reduce((accum, id) => {
      accum[id] = true;
      return accum;
    }, {} as Record<string, boolean>);
  }
}
