import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

import { trackByFactory } from '@atocha/core/ui';
import { Day, DishType, Menu, Tag } from '@atocha/menu-matriarch/types';

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
  set menu(menu: Menu | undefined) {
    this.entryModels =
      menu?.entries.map((entry) => ({
        day: entry.day,
        checked: !!entry.dishes.find((dish) => dish.id === this.id),
      })) ?? [];
  }
  @Output() dayChange = new EventEmitter<{
    id: string;
    day: Day;
    selected: boolean;
  }>();

  entryModels: EntryModel[] = [];
  readonly trackByFn = trackByFactory<EntryModel>(({ day }) => day);

  constructor(private _router: Router) {}

  onClick(id: string): void {
    this._router.navigate(['dishes', id]);
  }
}
