import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { InlineFormComponent } from './inline-form/inline-form.component';
import { InputComponent } from './input/input.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SectionComponent } from './section/section.component';
import { SmallCapsLabelComponent } from './small-caps-label/small-caps-label.component';
import { TabsetComponent } from './tabset/tabset.component';
import { TabComponent } from './tabset/tab/tab.component';

@NgModule({
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  declarations: [
    AlertComponent,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    InlineFormComponent,
    InputComponent,
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
    InlineFormComponent,
    InputComponent,
    SearchInputComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabsetComponent,
    TabComponent,
  ],
})
export class MenuMatriarchUiModule {}
