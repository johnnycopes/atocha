import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AutofocusDirective,
  MeasurementPipe,
  NestedCheckboxesWithCountsComponent,
} from '@atocha/core/ui';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutofocusDirective,
    MeasurementPipe,
    NestedCheckboxesWithCountsComponent,
  ],
  declarations: [
  ],
  exports: [
    AutofocusDirective,
    MeasurementPipe,
    NestedCheckboxesWithCountsComponent,
  ],
})
export class GlobetrotterUiModule {}
