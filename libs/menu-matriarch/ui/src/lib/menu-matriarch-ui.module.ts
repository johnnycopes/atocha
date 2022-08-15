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

import { AlertComponent } from './_generic/alert/alert.component';
import { ButtonComponent } from './_generic/button/button.component';
import { CardComponent } from './_generic/card/card.component';
import { CountComponent } from './count/count.component';
import { DishSummaryComponent } from './dish-summary/dish-summary.component';
import { EmptyViewPlaceholderComponent } from './empty-view-placeholder/empty-view-placeholder.component';
import { FilterableListComponent } from './filterable-list/filterable-list.component';
import { FiltersButtonComponent } from './filters-button/filters-button.component';
import { FiltersComponent } from './filters/filters.component';
import { InlineDaySelectComponent } from './inline-day-select/inline-day-select.component';
import { InlineFormComponent } from './_generic/inline-form/inline-form.component';
import { InlineNameEditComponent } from './inline-name-edit/inline-name-edit.component';
import { InputComponent } from './_generic/input/input.component';
import { MealSummaryComponent } from './meal-summary/meal-summary.component';
import { OptionsMenuComponent } from './_generic/options-menu/options-menu.component';
import { OptionsMenuItemComponent } from './_generic/options-menu/options-menu-item/options-menu-item.component';
import { OptionsMenuTriggerDirective } from './_generic/options-menu/options-menu-trigger.directive';
import { SearchInputComponent } from './_generic/search-input/search-input.component';
import { SectionComponent } from './_generic/section/section.component';
import { SmallCapsLabelComponent } from './_generic/small-caps-label/small-caps-label.component';
import { TabComponent } from './_generic/tabset/tab/tab.component';
import { TabsetComponent } from './_generic/tabset/tabset.component';
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
    AlertComponent,
    ButtonComponent,
    CardComponent,
    CountComponent,
    DishSummaryComponent,
    EmptyViewPlaceholderComponent,
    FiltersButtonComponent,
    FiltersComponent,
    FilterableListComponent,
    InlineDaySelectComponent,
    InlineFormComponent,
    InlineNameEditComponent,
    InputComponent,
    MealSummaryComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    SearchInputComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabsetComponent,
    TabComponent,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
  exports: [
    AlertComponent,
    AutofocusDirective,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    CountComponent,
    DishSummaryComponent,
    EmptyViewPlaceholderComponent,
    FiltersButtonComponent,
    FiltersComponent,
    FilterableListComponent,
    InlineDaySelectComponent,
    InlineFormComponent,
    InlineNameEditComponent,
    InputComponent,
    MealSummaryComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    PluralPipe,
    SafePipe,
    SearchInputComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabsetComponent,
    TabComponent,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
})
export class MenuMatriarchUiModule {}
