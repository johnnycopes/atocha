import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Dish } from '@models/dish.interface';
import { Orientation } from '@models/orientation.type';
import { Tag } from '@models/tag.interface';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealCardComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() description = '';
  @Input() dishes: Dish[] = [];
  @Input() tags: Tag[] = [];
  @Input() active = false;
  @Input() fallbackText = '';
  @Input() orientation: Orientation = 'horizontal';
}
