import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Menu } from '@models/menu.interface';
import { Tag } from '@models/tag.interface';
import { DishType } from '@models/dish-type.type';
import { Day } from '@models/day.type';
import { trackByDay } from '@utility/domain/track-by-functions';

interface EntryModel {
  day: Day;
  checked: boolean;
}

@Component({
  selector: 'app-planner-dish',
  templateUrl: './planner-dish.component.html',
  styleUrls: ['./planner-dish.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDishComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() description = '';
  @Input() link = '';
  @Input() type: DishType = 'main';
  @Input() tags: Tag[] = [];
  @Input() menuIds: string[] = [];
  @Input() mealIds: string[] = [];
  @Input() usages = 0;
  @Input()
  public set menu(menu: Menu | undefined) {
    this.entryModels = menu?.entries.map(entry => ({
      day: entry.day,
      checked: !!entry.dishes.find(dish => dish.id === this.id),
    })) ?? [];
  }
  @Output() dayChange = new EventEmitter<{ id: string, day: Day, selected: boolean }>();

  public entryModels: EntryModel[] = [];
  public readonly trackByFn = trackByDay;
}
