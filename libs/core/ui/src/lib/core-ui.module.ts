import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofocusDirective } from './autofocus/autofocus.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MeasurementPipe } from './measurement/measurement.pipe';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AutofocusDirective,
    CheckboxComponent,
    MeasurementPipe,
    TreeComponent,
  ],
  exports: [
    AutofocusDirective,
    CheckboxComponent,
    MeasurementPipe,
    TreeComponent,
  ],
})
export class CoreUiModule {}
