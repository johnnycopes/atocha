import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';

import { MenuMatriarchFeatureEntitiesModule } from '@atocha/menu-matriarch/feature-entities';
import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';
import { DishCardComponent } from './dish-card/dish-card.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishEditComponent } from './dish-edit/dish-edit.component';
import { DishesComponent } from './dishes.component';
import { DishPlaceholderComponent } from './dish-placeholder/dish-placeholder.component';

@NgModule({
  declarations: [
    DishCardComponent,
    DishDetailsComponent,
    DishEditComponent,
    DishesComponent,
    DishPlaceholderComponent,
  ],
  imports: [
    MenuMatriarchFeatureEntitiesModule,
    MenuMatriarchUiModule,
    CommonModule,
    FormsModule,
    EditorModule,
    RouterModule.forChild([
      { path: '', component: DishesComponent, children: [
        { path: '', component: DishPlaceholderComponent, pathMatch: 'full' },
        { path: 'new', component: DishEditComponent },
        { path: ':id', component: DishDetailsComponent },
        { path: ':id/edit', component: DishEditComponent },
      ] }
    ]),
  ],
})
export class MenuMatriarchFeatureDishesModule {}
