import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { SmallCapsLabelComponent } from './small-caps-label/small-caps-label.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    AlertComponent,
    ButtonComponent,
    SmallCapsLabelComponent
  ],
  exports: [
    AlertComponent,
    ButtonComponent,
    SmallCapsLabelComponent
  ],
})
export class MenuMatriarchUiModule {}
