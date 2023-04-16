import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  MealSummaryComponent,
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/ui';
import { CardComponent } from '@atocha/menu-matriarch/ui-generic';
import { Dish, Orientation, Tag } from '@atocha/menu-matriarch/util';

@Component({
  standalone: true,
  selector: 'app-meal-card',
  imports: [
    CardComponent,
    CommonModule,
    MealSummaryComponent,
    RouterLink,
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
}
