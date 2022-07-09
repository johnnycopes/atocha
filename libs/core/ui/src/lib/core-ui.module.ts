import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AutofocusDirective } from './autofocus/autofocus.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MeasurementPipe } from './measurement/measurement.pipe';
import { NestedCheckboxesComponent } from './nested-checkboxes/nested-checkboxes.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    AutofocusDirective,
    CheckboxComponent,
    MeasurementPipe,
    NestedCheckboxesComponent,
    TreeComponent,
  ],
  exports: [
    AutofocusDirective,
    CheckboxComponent,
    MeasurementPipe,
    NestedCheckboxesComponent,
    TreeComponent,
  ],
})
export class CoreUiModule {}
