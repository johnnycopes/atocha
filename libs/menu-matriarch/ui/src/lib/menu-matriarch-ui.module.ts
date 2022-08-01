import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { SectionComponent } from './section/section.component';
import { SmallCapsLabelComponent } from './small-caps-label/small-caps-label.component';
import { TabsetComponent } from './tabset/tabset.component';
import { TabComponent } from './tabset/tab/tab.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    AlertComponent,
    ButtonComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabsetComponent,
    TabComponent,
  ],
  exports: [
    AlertComponent,
    ButtonComponent,
    SectionComponent,
    SmallCapsLabelComponent,
    TabsetComponent,
    TabComponent,
  ],
})
export class MenuMatriarchUiModule {}
