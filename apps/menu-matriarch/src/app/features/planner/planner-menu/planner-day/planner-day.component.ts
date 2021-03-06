import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Day, Dish, Orientation } from '@atocha/menu-matriarch/types';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-planner-day]',
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
  public readonly addIcon = faPlusSquare;
  public readonly clearIcon = faTimes;
  public dishIds = '';
  private _dishes: Dish[] = [];

  public ngOnInit(): void {
    if (!this.day) {
      throw new Error('DayComponent must have an assigned "day" property');
    }
  }
}
