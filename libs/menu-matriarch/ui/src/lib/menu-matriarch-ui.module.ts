import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CountComponent } from './count/count.component';
import { InlineFormComponent } from './inline-form/inline-form.component';
import { InputComponent } from './input/input.component';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { OptionsMenuItemComponent } from './options-menu/options-menu-item/options-menu-item.component';
import { OptionsMenuTriggerDirective } from './options-menu/options-menu-trigger.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import { SectionComponent } from './section/section.component';
import { SmallCapsLabelComponent } from './small-caps-label/small-caps-label.component';
import { TabComponent } from './tabset/tab/tab.component';
import { TabsetComponent } from './tabset/tabset.component';

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
