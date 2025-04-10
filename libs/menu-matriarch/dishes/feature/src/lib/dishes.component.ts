import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DishCardComponent } from './dish-card/dish-card.component';
import {
  DishDefDirective,
  DishesListComponent,
} from '@atocha/menu-matriarch/shared/feature';

@Component({
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
