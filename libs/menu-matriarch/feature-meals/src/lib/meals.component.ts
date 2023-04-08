import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MealCardComponent } from './meal-card/meal-card.component';
import { MenuMatriarchFeatureEntitiesModule } from '@atocha/menu-matriarch/feature-entities';

@Component({
  standalone: true,
  selector: 'app-meals',
  imports: [
    MealCardComponent,
    MenuMatriarchFeatureEntitiesModule,
    RouterModule,
  ],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsComponent {}
