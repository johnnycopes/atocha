import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishEditComponent } from './dish-edit/dish-edit.component';
import { DishesComponent } from './dishes.component';
import { DishPlaceholderComponent } from './dish-placeholder/dish-placeholder.component';

@NgModule({
  imports: [
    DishesComponent,
    RouterModule.forChild([
      {
        path: '',
        component: DishesComponent,
        children: [
          { path: '', component: DishPlaceholderComponent, pathMatch: 'full' },
          { path: 'new', component: DishEditComponent },
          { path: ':id', component: DishDetailsComponent },
          { path: ':id/edit', component: DishEditComponent },
        ],
      },
    ]),
  ],
})
export class MenuMatriarchFeatureDishesModule {}
