import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { UiGlobetrotterModule } from '@atocha/ui-globetrotter';
import { SelectComponent } from './select.component';
import { SelectCountriesComponent } from './select-countries/select-countries.component';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';
import { SelectTypeComponent } from './select-type/select-type.component';

@NgModule({
  declarations: [
    SelectComponent,
    SelectCountriesComponent,
    SelectQuantityComponent,
    SelectTypeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UiGlobetrotterModule,
    FormsModule
  ],
  exports: [
    SelectComponent,
    SelectCountriesComponent,
    SelectQuantityComponent,
    SelectTypeComponent
  ],
})
export class SelectModule { }
