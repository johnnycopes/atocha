import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective, CoreUiModule } from '@atocha/core/ui';

@NgModule({
  imports: [CommonModule, CoreUiModule],
  exports: [AutofocusDirective]
})
export class MenuMatriarchUiModule {}
