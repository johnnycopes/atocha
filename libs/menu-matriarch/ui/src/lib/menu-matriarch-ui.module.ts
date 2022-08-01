import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [AlertComponent, ButtonComponent],
  exports: [AlertComponent, ButtonComponent],
})
export class MenuMatriarchUiModule {}
