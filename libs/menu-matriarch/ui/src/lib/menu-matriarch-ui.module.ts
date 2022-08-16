import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  AutofocusDirective,
  CheckboxComponent,
  PluralPipe,
  SafePipe,
} from '@atocha/core/ui';

import { CountComponent } from './count/count.component';
import { DishSummaryComponent } from './dish-summary/dish-summary.component';
import { EmptyViewPlaceholderComponent } from './empty-view-placeholder/empty-view-placeholder.component';
import { FilterableListComponent } from './filterable-list/filterable-list.component';
import { FiltersButtonComponent } from './filters-button/filters-button.component';
import { FiltersComponent } from './filters/filters.component';
import { InlineDaySelectComponent } from './inline-day-select/inline-day-select.component';
import { InlineNameEditComponent } from './inline-name-edit/inline-name-edit.component';
import { MealSummaryComponent } from './meal-summary/meal-summary.component';
import { TagComponent } from './tags/tag/tag.component';
import { TagDefDirective } from './tags/tags-list/tag-def.directive';
import { TagsListComponent } from './tags/tags-list/tags-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    FontAwesomeModule,
    AutofocusDirective,
    CheckboxComponent,
    PluralPipe,
    SafePipe,
  ],
  declarations: [
    CountComponent,
    DishSummaryComponent,
    EmptyViewPlaceholderComponent,
    FiltersButtonComponent,
    FiltersComponent,
    FilterableListComponent,
    InlineDaySelectComponent,
    InlineNameEditComponent,
    MealSummaryComponent,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
  exports: [
    AutofocusDirective,
    CheckboxComponent,
    CountComponent,
    DishSummaryComponent,
    EmptyViewPlaceholderComponent,
    FiltersButtonComponent,
    FiltersComponent,
    FilterableListComponent,
    InlineDaySelectComponent,
    InlineNameEditComponent,
    MealSummaryComponent,
    PluralPipe,
    SafePipe,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
})
export class MenuMatriarchUiModule {}
