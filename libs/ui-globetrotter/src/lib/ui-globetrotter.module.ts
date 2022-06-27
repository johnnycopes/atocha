import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiCoreModule, AutofocusDirective } from '@atocha/ui-core';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { NestedCheckboxesComponent } from './nested-checkboxes/nested-checkboxes.component';
import { NestedCheckboxesWithCountsComponent } from './nested-checkboxes-with-counts/nested-checkboxes-with-counts.component';

@NgModule({
  imports: [CommonModule, FormsModule, UiCoreModule],
  declarations: [
    AlertComponent,
    ButtonComponent,
    CheckboxComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesWithCountsComponent,
  ],
  exports: [
    AlertComponent,
    AutofocusDirective,
    ButtonComponent,
    CheckboxComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesWithCountsComponent,
  ],
})
export class UiGlobetrotterModule {}
