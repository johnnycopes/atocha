import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiGlobetrotterModule } from '@atocha/ui-globetrotter';
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
    RadioButtonsComponent,
    TabComponent,
    TabsetComponent,
  ],
  exports: [
    RadioButtonsComponent,
    TabComponent,
    TabsetComponent,
  ]
})
export class SharedModule { }
