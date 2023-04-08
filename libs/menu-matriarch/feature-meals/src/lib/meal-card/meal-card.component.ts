import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {
  CardComponent,
  MealSummaryComponent,
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/ui';
import { Dish, Orientation, Tag } from '@atocha/menu-matriarch/util';

@Component({
  standalone: true,
  selector: 'app-meal-card',
  imports: [
    CardComponent,
    CommonModule,
    MealSummaryComponent,
    RouterModule,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private _router: Router) {}

  onDishClick(id: string): void {
    this._router.navigate(['dishes', id]);
  }
}
