import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MealCardComponent } from './meal-card/meal-card.component';
import {
  MealDefDirective,
  MealsListComponent,
} from '@atocha/menu-matriarch/shared/feature';

@Component({
  standalone: true,
  selector: 'app-meals',
  imports: [
    MealCardComponent,
    MealDefDirective,
    MealsListComponent,
    RouterModule,
  ],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsComponent {}
