import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiGlobetrotterModule } from '@atocha/ui-globetrotter';
import { FormComponent } from './components/form/form.component';
import { IconComponent } from './components/icon/icon.component';
import { InputComponent } from './components/input/input.component';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MeasurementPipe } from './pipes/measurement.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';
import { SmallCapsComponent } from './components/small-caps/small-caps.component';
import { SmallCapsContentComponent } from './components/small-caps-content/small-caps-content.component';
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
    FormComponent,
    IconComponent,
    InputComponent,
    ListDetailsComponent,
    LoaderComponent,
    MeasurementPipe,
    ModalComponent,
    RadioButtonsComponent,
    SmallCapsComponent,
    SmallCapsContentComponent,
    TabComponent,
    TabsetComponent,
  ],
  exports: [
    FormComponent,
    IconComponent,
    InputComponent,
    ListDetailsComponent,
    LoaderComponent,
    MeasurementPipe,
    ModalComponent,
    RadioButtonsComponent,
    SmallCapsComponent,
    SmallCapsContentComponent,
    TabComponent,
    TabsetComponent,
  ]
})
export class SharedModule { }
