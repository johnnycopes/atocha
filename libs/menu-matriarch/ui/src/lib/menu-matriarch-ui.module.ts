import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { InputComponent } from './input/input.component';
import { SectionComponent } from './section/section.component';
import { SmallCapsLabelComponent } from './small-caps-label/small-caps-label.component';
import { TabsetComponent } from './tabset/tabset.component';
import { TabComponent } from './tabset/tab/tab.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    AlertComponent,
    ButtonComponent,
    CardComponent,
    InputComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabsetComponent,
    TabComponent,
  ],
  exports: [
    AlertComponent,
    ButtonComponent,
    CardComponent,
    InputComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabsetComponent,
    TabComponent,
  ],
})
export class MenuMatriarchUiModule {}
