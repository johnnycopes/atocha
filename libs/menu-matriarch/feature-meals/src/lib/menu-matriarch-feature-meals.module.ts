import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MenuMatriarchFeatureEntitiesModule } from '@atocha/menu-matriarch/feature-entities';
import { CardComponent, DishSummaryComponent, InputComponent, MealSummaryComponent, SectionComponent, TagComponent, TagsListComponent } from '@atocha/menu-matriarch/ui';
import { MealCardComponent } from './meal-card/meal-card.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealPlaceholderComponent } from './meal-placeholder/meal-placeholder.component';
import { MealsComponent } from './meals.component';
import { AutofocusDirective } from '@atocha/core/ui';

@NgModule({
  declarations: [
    MealCardComponent,
    MealDetailsComponent,
    MealEditComponent,
    MealPlaceholderComponent,
    MealsComponent,
  ],
  imports: [
    AutofocusDirective,
    CardComponent,
    CommonModule,
    DishSummaryComponent,
    FormsModule,
    InputComponent,
    MealSummaryComponent,
    MenuMatriarchFeatureEntitiesModule,
    SectionComponent,
    TagComponent,
    TagsListComponent,
    RouterModule.forChild([
      {
        path: '',
        component: MealsComponent,
        children: [
          { path: '', component: MealPlaceholderComponent, pathMatch: 'full' },
          { path: 'new', component: MealEditComponent },
          { path: ':id', component: MealDetailsComponent },
          { path: ':id/edit', component: MealEditComponent },
        ],
      },
    ]),
  ],
})
export class MenuMatriarchFeatureMealsModule {}
