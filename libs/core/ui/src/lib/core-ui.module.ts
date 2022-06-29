import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofocusDirective } from './autofocus/autofocus.directive';
import { MeasurementPipe } from './measurement/measurement.pipe';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AutofocusDirective, MeasurementPipe, TreeComponent],
  exports: [AutofocusDirective, MeasurementPipe, TreeComponent],
})
export class CoreUiModule {}
