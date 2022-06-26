import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiCoreModule, AutofocusDirective, TreeComponent } from '@atocha/ui-core';

import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { NestedCheckboxesComponent } from './nested-checkboxes/nested-checkboxes.component';

@NgModule({
  imports: [CommonModule, FormsModule, UiCoreModule],
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    NestedCheckboxesComponent,
  ],
  exports: [
    AutofocusDirective,
    ButtonComponent,
    CheckboxComponent,
    NestedCheckboxesComponent,
    TreeComponent,
  ],
})
export class UiGlobetrotterModule {}
