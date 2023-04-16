import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CheckboxComponent, trackByFactory } from '@atocha/core/ui';
import { CardComponent, LegacyDishSummaryComponent } from '@atocha/menu-matriarch/ui';
import { Day, DishType, Menu, Tag } from '@atocha/menu-matriarch/util';

interface EntryModel {
  day: Day;
  checked: boolean;
}

@Component({
  standalone: true,
  selector: 'app-planner-dish',
  imports: [
    CardComponent,
    CheckboxComponent,
    CommonModule,
    LegacyDishSummaryComponent,
    FormsModule,
  ],
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
      menu?.entries.map(({ day, dishes }) => ({
        day,
        checked: !!dishes.find(({ id }) => id === this.id),
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
