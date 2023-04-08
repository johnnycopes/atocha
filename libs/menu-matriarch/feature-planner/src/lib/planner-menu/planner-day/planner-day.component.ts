import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

import {
  MealSummaryComponent,
  SmallCapsLabelComponent,
} from '@atocha/menu-matriarch/ui';
import { Day, Dish, Orientation } from '@atocha/menu-matriarch/util';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-planner-day]',
  imports: [
    CommonModule,
    FontAwesomeModule,
    MealSummaryComponent,
    RouterModule,
    SmallCapsLabelComponent,
  ],
  templateUrl: './planner-day.component.html',
  styleUrls: ['./planner-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDayComponent implements OnInit {
  @Input() day: Day | undefined;
  @Input()
  set dishes(value: Dish[]) {
    this.dishIds = JSON.stringify(value.map((dish) => dish.id));
    this._dishes = value;
  }
  get dishes(): Dish[] {
    return this._dishes;
  }
  @Input() fallbackText = '';
  @Input() orientation: Orientation = 'horizontal';
  @Output() clear = new EventEmitter<void>();
  dishIds = '';
  readonly addIcon = faPlusSquare;
  readonly clearIcon = faTimes;
  private _dishes: Dish[] = [];

  constructor(private _router: Router) {}

  ngOnInit(): void {
    if (!this.day) {
      throw new Error('DayComponent must have an assigned "day" property');
    }
  }

  onDishClick(id: string): void {
    this._router.navigate(['dishes', id]);
  }
}
