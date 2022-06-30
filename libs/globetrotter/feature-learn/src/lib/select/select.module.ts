import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GlobetrotterUiModule } from '@atocha/globetrotter-ui';
import { SelectComponent } from './select.component';
import { SelectCountriesComponent } from './select-countries/select-countries.component';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';
import { SelectTypeComponent } from './select-type/select-type.component';

@NgModule({
  imports: [CommonModule, FormsModule, GlobetrotterUiModule],
  declarations: [
    SelectComponent,
    SelectCountriesComponent,
    SelectQuantityComponent,
    SelectTypeComponent,
  ]
})
export class SelectModule {}
