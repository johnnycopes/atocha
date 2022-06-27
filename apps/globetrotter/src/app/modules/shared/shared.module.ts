import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiGlobetrotterModule } from '@atocha/ui-globetrotter';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MeasurementPipe } from './pipes/measurement.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';
import { TabComponent } from './components/tabset/tab/tab.component';
import { TabsetComponent } from './components/tabset/tabset.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiGlobetrotterModule
  ],
  declarations: [
    ListDetailsComponent,
    LoaderComponent,
    MeasurementPipe,
    ModalComponent,
    RadioButtonsComponent,
    TabComponent,
    TabsetComponent,
  ],
  exports: [
    ListDetailsComponent,
    LoaderComponent,
    MeasurementPipe,
    ModalComponent,
    RadioButtonsComponent,
    TabComponent,
    TabsetComponent,
  ]
})
export class SharedModule { }
