import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCoreModule, AutofocusDirective } from '@atocha/ui-core';

import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [CommonModule, UiCoreModule],
  declarations: [ButtonComponent],
  exports: [AutofocusDirective, ButtonComponent],
})
export class UiGlobetrotterModule {}
