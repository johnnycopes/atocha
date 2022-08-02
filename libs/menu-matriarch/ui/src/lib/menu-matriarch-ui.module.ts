import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertComponent } from './_generic/alert/alert.component';
import { ButtonComponent } from './_generic/button/button.component';
import { CardComponent } from './_generic/card/card.component';
import { CheckboxComponent } from './_generic/checkbox/checkbox.component';
import { CountComponent } from './count/count.component';
import { InlineFormComponent } from './_generic/inline-form/inline-form.component';
import { InputComponent } from './_generic/input/input.component';
import { OptionsMenuComponent } from './_generic/options-menu/options-menu.component';
import { OptionsMenuItemComponent } from './_generic/options-menu/options-menu-item/options-menu-item.component';
import { OptionsMenuTriggerDirective } from './_generic/options-menu/options-menu-trigger.directive';
import { SearchInputComponent } from './_generic/search-input/search-input.component';
import { SectionComponent } from './_generic/section/section.component';
import { SmallCapsLabelComponent } from './_generic/small-caps-label/small-caps-label.component';
import { TabComponent } from './_generic/tabset/tab/tab.component';
import { TabsetComponent } from './_generic/tabset/tabset.component';

@NgModule({
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  declarations: [
    AlertComponent,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    CountComponent,
    InlineFormComponent,
    InputComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    SearchInputComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabsetComponent,
    TabComponent,
  ],
  exports: [
    AlertComponent,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    CountComponent,
    InlineFormComponent,
    InputComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
    SearchInputComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabsetComponent,
    TabComponent,
  ],
})
export class MenuMatriarchUiModule {}
