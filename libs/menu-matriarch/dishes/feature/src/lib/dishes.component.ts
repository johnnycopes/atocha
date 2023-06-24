import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DishCardComponent } from './dish-card/dish-card.component';
import {
  DishDefDirective,
  DishesListComponent,
} from '@atocha/menu-matriarch/feature-entities';

@Component({
  standalone: true,
  selector: 'app-dishes',
  imports: [
    DishCardComponent,
    DishDefDirective,
    DishesListComponent,
    RouterModule,
  ],
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishesComponent {}
