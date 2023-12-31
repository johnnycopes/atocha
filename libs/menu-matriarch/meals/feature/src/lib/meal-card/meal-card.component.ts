import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CardComponent } from '@atocha/menu-matriarch/shared/ui';
import { Dish, Orientation, Tag } from '@atocha/menu-matriarch/shared/util';
import { MealSummaryComponent } from '@atocha/menu-matriarch/meals/ui';
import {
  TagComponent,
  TagDefDirective,
  TagsListComponent,
} from '@atocha/menu-matriarch/tags/ui';

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
