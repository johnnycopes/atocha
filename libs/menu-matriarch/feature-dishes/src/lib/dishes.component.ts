import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuMatriarchFeatureEntitiesModule } from '@atocha/menu-matriarch/feature-entities';
import { DishCardComponent } from './dish-card/dish-card.component';

@Component({
  standalone: true,
  selector: 'app-dishes',
  imports: [
    DishCardComponent,
    MenuMatriarchFeatureEntitiesModule,
    RouterModule,
  ],
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishesComponent {}
