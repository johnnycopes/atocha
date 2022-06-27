import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiGlobetrotterModule } from '@atocha/ui-globetrotter';
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
    TabComponent,
    TabsetComponent,
  ],
  exports: [
    TabComponent,
    TabsetComponent,
  ]
})
export class SharedModule { }
