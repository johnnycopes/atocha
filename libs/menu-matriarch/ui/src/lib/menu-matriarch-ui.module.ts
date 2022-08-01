import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class MenuMatriarchUiModule {}
